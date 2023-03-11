import { requestMiddleware } from "@shared/middlewares/request.middleware";
import { env } from "@shared/services/env";
import express from "express";
import * as core from "express-serve-static-core";
import { TokenService } from "./services/token.service";
import { AuthService } from "./services/auth.service";
import { inject } from "inversify";
import { REFERENCES } from "@modules/app/app.references";
import { controller, httpPost, httpGet } from "inversify-express-utils";
import { RegistrationDto } from "./dtos/registration.dto";
import { LoginDto } from "./dtos/login.dto";
import { LogoutDto } from "./dtos/logout.dto";
import { ActivateDto } from "./dtos/activate.dto";
import { RefreshDto } from "./dtos/refresh.dto";

@controller("/auth")
export class AuthController {
	@inject(REFERENCES.AuthService) private readonly authService: AuthService;
	@inject(REFERENCES.TokenService) private readonly tokenService: TokenService;

	@httpPost("/login", ...requestMiddleware(LoginDto, { errorMessage: "Ошибка аутентификации." }))
	async login(
		req: express.Request<any, any, LoginDto>,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const { userDto, tokens } = await this.authService
				.getUserByLogin(req.body)
				.then(async (userDto) => {
					const tokens = await this.tokenService.generateTokens({ userDto, res });

					return {
						userDto,
						tokens: {
							access: tokens.access,
						},
					};
				});

			return res.status(200).json({
				message: "Аутентификация прошла успешно.",
				user: userDto,
				tokens,
			});
		} catch (error) {
			next(error);
		}
	}

	@httpPost(
		"/registration",
		...requestMiddleware(RegistrationDto, { errorMessage: "Ошибка регистрации." }),
	)
	async registration(
		req: express.Request<any, any, RegistrationDto>,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const { userDto, tokens } = await this.authService
				.createUserIfNotExists(req.body)
				.then(async (userDto) => {
					const tokens = await this.tokenService.generateTokens({ userDto, res });

					return {
						userDto,
						tokens: {
							access: tokens.access,
						},
					};
				});

			return res.status(200).json({
				message: "Пользователь создан успешно.",
				user: userDto,
				tokens,
			});
		} catch (error) {
			next(error);
		}
	}

	@httpPost(
		"/logout",
		...requestMiddleware(LogoutDto, { errorMessage: "Ошибка выхода из системы." }),
	)
	async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
		try {
			await this.tokenService.removeRefreshToken(req.cookies["refresh_token"]).then(() => {
				this.tokenService.removeRefreshTokenFromCookie(res);
			});

			res.status(200).json({ message: "Выход из системы успешен." });
		} catch (error) {
			next(error);
		}
	}

	@httpGet(
		"/activate/:verification_link",
		...requestMiddleware(ActivateDto, {
			errorMessage: "Ошибка активации email.",
			withParams: true,
		}),
	)
	async activate(
		req: express.Request<core.ParamsDictionary, any, ActivateDto>,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			await this.authService.updateUserEmailVerificationStatus(req.body);

			return res.redirect(env.CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}

	@httpGet(
		"/refresh",
		...requestMiddleware(RefreshDto, { errorMessage: "Ошибка обновления токена." }),
	)
	async refresh(
		req: express.Request<core.ParamsDictionary, any, RefreshDto>,
		res: express.Response,
		next: express.NextFunction,
	) {
		try {
			const tokens = await this.tokenService.refreshAccessToken({
				refresh_token: req.cookies["refresh_token"],
				res,
			});

			res.status(200).json({ message: "Токен обновлен успешно.", tokens });
		} catch (error) {
			next(error);
		}
	}
}
