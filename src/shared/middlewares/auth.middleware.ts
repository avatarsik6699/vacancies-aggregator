import { ApiError } from "@shared/exceptions/api-error";
import { env } from "@shared/services/env";
import { UserDto } from "entity/user/user.dto";
import express from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
	req: express.Request & { user?: UserDto },
	res: Express.Response,
	next: express.NextFunction,
) => {
	if (req.method === "OPTIONS") next();

	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) return next(ApiError.UnauthorizedError());

		const [, token] = authHeader.split(" ") || [];

		if (!token) return next(ApiError.UnauthorizedError());

		const data = jwt.verify(token, env.JWT_ACCESS_SECRET) as UserDto;

		req.user = UserDto.from(data);

		next();
	} catch (error) {
		next(ApiError.UnauthorizedError());
	}
};
