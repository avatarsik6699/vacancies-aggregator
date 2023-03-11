import { IDatabase } from "@modules/app/db/db.types";
import { env } from "@shared/services/env";
import { injectable } from "inversify";
import postgres from "postgres";

@injectable()
export class Database implements IDatabase {
	public sql: IDatabase["sql"];

	constructor() {
		this.create();
	}

	create() {
		this.sql = postgres({
			user: env.DB_USER,
			password: env.DB_PASSWORD,
			host: env.DB_HOST,
			database: env.DB_DATABASE,
			port: env.DB_PORT,
		});
	}
}
