import "reflect-metadata";
import * as dotenv from "dotenv";
const { error } = dotenv.config();

import { env } from "./shared/services/env";
import { AppModule } from "@modules/app/app.module";

const bootstrap = () => {
	if (error) {
		throw new Error(
			`
				Environment variables are not set. 
				Before starting the server, you need to set environment variables.
			`,
		);
	}

	AppModule.create().start(env.SERVER_PORT);
};

bootstrap();
