import { logger } from "@shared/services/logger/logger.service";
import { UserDto } from "entity/user/user.dto";
import express from "express";

export const roleMiddleware = (role: string) => {
	return (
		req: express.Request & { user: UserDto & { role: string } },
		res: express.Response,
		next: express.NextFunction,
	) => {
		if (req.method === "OPTIONS") next();

		try {
			console.log(req.user);
			if (typeof req.user === "object" && req.user.role === role) {
				next();
			} else {
				return res.status(403).json({ msg: "Отказано в доступе" });
			}
		} catch (error) {
			if (error instanceof Error) logger.err(error.message);
			return res.status(403).json({ msg: "Пользователь не авторизован" });
		}
	};
};
