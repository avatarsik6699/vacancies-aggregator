import { REFERENCES } from "@modules/app/app.references";
import { IDatabase, Model } from "@modules/app/db/db.types";
import { utils } from "@shared/utils";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository {
	@inject(REFERENCES.Database) private db: IDatabase;

	create(params: Required<Pick<Model.User, "login" | "password" | "email" | "verification_link">>) {
		return this.db.sql<Model.User[]>`
			INSERT INTO users 
			(login, password, email, verification_link)
			VALUES(${params.login}, ${params.password}, ${params.email}, ${params.verification_link}) 
			RETURNING *;
    `.then((data) => data[0]);
	}

	update(
		params: Required<Pick<Model.User, "id" | "login" | "password" | "email" | "is_verified">>,
	) {
		return this.db.sql<(Model.User | undefined)[]>`
			UPDATE users 
			SET (login, password, email, is_verified) =
			(
				${params.login}, 
				${params.password}, 
				${params.email}, 
				${params.is_verified}, 
			)
			WHERE id = ${params.id}
			RETURNING *;
		`.then((data) => data[0]);
	}

	findOne({
		email = "",
		login = "",
		verification_link = "",
		id = 0,
	}: Partial<Pick<Model.User, "id" | "email" | "login" | "verification_link">>) {
		console.log(email, login, verification_link, id);

		return this.db.sql<(Model.User | undefined)[]>`
			SELECT * FROM users 
			WHERE email = ${email} 
			OR login = ${login} 
			OR verification_link = ${verification_link}
			OR id = ${id}
		`.then((data) => data[0]);
	}

	findAll() {
		return this.db.sql<Model.User[]>`
			SELECT * FROM users;
		`;
	}
}
