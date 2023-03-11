import { env } from "@shared/services/env";
import { logger } from "@shared/services/logger/logger.service";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./app.container";
import { ApiError } from "@shared/exceptions/api-error";
import { utils } from "@shared/utils";

export class AppModule {
	private server: express.Application;

	private constructor() {}

	public start(port: number) {
		if (!this.server) throw new Error("server not initialized.");

		const invalidEnvKeys = this.validateEnvConfig(env);

		if (invalidEnvKeys.length) {
			throw new Error(`required keys missing in env configuration: ${invalidEnvKeys}`);
		}

		this.server.listen(port, () => {
			// TODO: сделать текст в завиисмости от среды
			logger.log(`server start http://localhost:${port}`);
		});

		return this;
	}

	public static create() {
		const instance = new AppModule();
		const server = new InversifyExpressServer(container, null, { rootPath: "/api" });

		server.setErrorConfig((app) => {
			instance.useExceptions(app);
		});

		server.setConfig((app) => {
			instance.useMiddlewares(app);
		});

		instance.server = server.build();

		return instance;
	}

	private useMiddlewares(app: express.Application) {
		app.use(express.json());
		app.use(cookieParser());
		app.use(
			cors({
				credentials: true,
				origin: env.CLIENT_URL,
			}),
		);
	}

	private useExceptions(app: express.Application) {
		app.use(
			(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
				utils.onError(err);

				if (err instanceof ApiError) {
					return res
						.status(err.status)
						.json({ message: err.message, ...(err.errors.length && { errors: err.errors }) });
				}

				return res.status(500).json({ message: "Непредвиденная ошибка" });
			},
		);
	}

	private validateEnvConfig(env: Record<string, any>) {
		// TODO: сейчас все ключи в конфиге являются обязательными...
		return Object.entries(env).reduce<string[]>((state, [key, value]) => {
			if (value === undefined || Number.isNaN(value)) state.push(key);

			return state;
		}, []);
	}
}
