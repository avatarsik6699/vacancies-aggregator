import { REFERENCES } from "@modules/app/app.references";
import { GetOneUserDto } from "./dtos/getOneUser.dto";
import {
	controller,
	httpGet,
	request,
	response,
	requestParam,
	next,
} from "inversify-express-utils";
import * as express from "express";
import { requestMiddleware } from "@shared/middlewares/request.middleware";
import { authMiddleware } from "@shared/middlewares/auth.middleware";
import { inject } from "inversify";
import { UserService } from "./services/user.service";
import { UserDto } from "entity/user/user.dto";

@controller("/user")
export class UserController {
	@inject(REFERENCES.UserService) userService: UserService;

	@httpGet(
		"/:id",
		authMiddleware,
		...requestMiddleware(GetOneUserDto, {
			withParams: true,
			errorMessage: "Ошибка получения пользователя.",
		}),
	)
	async index(
		@request() req: express.Request<any, any, GetOneUserDto> & { user?: UserDto },
		@response() res: express.Response,
		@next() next: express.NextFunction,
	) {
		try {
			// TODO: эту инфу может получить только авторизованный пользователь и только о себе.
			// если это супер юзер / админ, то может получить инфу не только о себе.
			const userDto = await this.userService.getUser(req.body);

			return res.status(200).json({ user: userDto });
		} catch (error) {
			next(error);
		}
	}

	@httpGet("/", authMiddleware)
	async list(
		@request() req: express.Request,
		@response() res: express.Response,
		next: express.NextFunction,
	) {
		try {
			// TODO: если это супер юзер / админ, то может получить инфу.
			const usersDto = await this.userService.getUsers();

			return res.status(200).json({ users: usersDto });
		} catch (error) {
			next(error);
		}
	}
}
