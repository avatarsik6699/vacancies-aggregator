import postgres from "postgres";

export interface IDatabase {
	sql: postgres.Sql<{}>;
}

export namespace Model {
	export interface User {
		id: number;
		login: string;
		email: string;
		password: string;
		is_verified: boolean;
		verification_link: string;
		updated_at: string;
		created_at: string;
	}

	export interface Token {
		id: number;
		user_id: number;
		refresh_token: string;
		updated_at: string;
		created_at: string;
	}
}
