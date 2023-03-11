import express from "express";
import { ApiError } from "@shared/exceptions/api-error";
import jwt from "jsonwebtoken";
import { env } from "@shared/services/env";
import { injectable, inject } from "inversify";
import { REFERENCES } from "@modules/app/app.references";
import { TokenRepository } from "entity/token/token.repository";
import { Model } from "@modules/app/db/db.types";
import { TokenDto } from "entity/token/token.dto";
import { UserRepository } from "entity/user/user.repository";
import { UserDto } from "entity/user/user.dto";

@injectable()
export class TokenService {
	@inject(REFERENCES.TokenRepository) tokenRepository: TokenRepository;
	@inject(REFERENCES.UserRepository) userRepository: UserRepository;

	async refreshAccessToken({
		refresh_token,
		res,
	}: Pick<Model.Token, "refresh_token"> & { res: express.Response<any, Record<string, any>> }) {
		// Проверка токен на валидность.
		const isValidToken = this.validateToken(refresh_token, env.JWT_REFRESH_SECRET);
		// Проверка наличия такого токена в бд.
		const token = await this.tokenRepository.findOne({ refresh_token });
		if (!isValidToken || !token) throw ApiError.UnauthorizedError();

		const user = await this.userRepository.findOne({ id: token.user_id });
		if (!user) throw ApiError.BadRequest("Пользователь с данными токеном не найден.");

		const userDto = UserDto.from(user);

		// генерируем юзеру новые jwt токены
		const tokens = await this.generateTokens({ userDto, res });

		return {
			access: tokens.access,
		};
	}

	async removeRefreshToken(params: Pick<Model.Token, "id">) {
		const data = await this.tokenRepository.remove(params);

		if (!data) throw ApiError.BadRequest("Токен не был удален из базы данных.");

		return TokenDto.from(data);
	}

	async generateTokens({
		userDto,
		res,
	}: {
		userDto: UserDto;
		res: express.Response<any, Record<string, any>>;
	}) {
		const userData = userDto.to();

		const tokens = {
			access: jwt.sign(userData, env.JWT_ACCESS_SECRET, { expiresIn: "30m" }),
			refresh: jwt.sign(userData, env.JWT_REFRESH_SECRET, { expiresIn: "30d" }),
		};

		await this.saveOrUpdateRefreshToken({
			user_id: userDto.id,
			refresh_token: tokens.refresh,
		});

		this.saveRefreshTokenToCookie(res, tokens.refresh);

		return tokens;
	}

	removeRefreshTokenFromCookie(res: express.Response<any, Record<string, any>>) {
		res.clearCookie("refresh_token");
	}

	private async saveOrUpdateRefreshToken(params: Pick<Model.Token, "user_id" | "refresh_token">) {
		let data;

		const isTokenExists = await this.tokenRepository.findOne({ user_id: params.user_id });

		if (isTokenExists) {
			data = await this.tokenRepository.update(params);
		} else {
			data = await this.tokenRepository.add(params);
		}

		return TokenDto.from(data);
	}

	private validateToken(token: string, secret: string) {
		try {
			return jwt.verify(token, secret);
		} catch (error) {
			return null;
		}
	}

	private saveRefreshTokenToCookie(
		res: express.Response<any, Record<string, any>>,
		refreshToken: string,
	) {
		res.cookie("refresh_token", refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});
	}
}
