import { REFERENCES } from "@modules/app/app.references";
import { IDatabase, Model } from "@modules/app/db/db.types";
import { inject, injectable } from "inversify";

@injectable()
export class TokenRepository {
	@inject(REFERENCES.Database) private db: IDatabase;

	findOne({
		id = 0,
		user_id = 0,
		refresh_token = "",
	}: Partial<Pick<Model.Token, "id" | "user_id" | "refresh_token">>) {
		return this.db.sql<(Model.Token | undefined)[]>`
			SELECT * FROM tokens 
			WHERE user_id = ${user_id}
			OR id = ${id}
			OR refresh_token = ${refresh_token};
		`.then((data) => data[0]);
	}

	findAll() {
		return this.db.sql<Model.Token[]>`SELECT * FROM tokens;`;
	}

	remove(params: Partial<Pick<Model.Token, "id" | "user_id" | "refresh_token">>) {
		return this.db.sql<(Model.Token | undefined)[]>`
			DELETE FROM tokens 
			WHERE user_id = ${params.user_id || ""}
			OR id = ${params.id || ""}
			OR refresh_token = ${params.refresh_token || ""};
			RETURNING *;
		`.then((data) => data[0]);
	}

	add(params: Pick<Model.Token, "user_id" | "refresh_token">) {
		return this.db.sql<Model.Token[]>`
				INSERT INTO tokens (user_id, refresh_token) 
				VALUES (${params.user_id}, ${params.refresh_token}) 
				RETURNING *;
			`.then((data) => data[0]);
	}

	update(params: Pick<Model.Token, "user_id" | "refresh_token">) {
		return this.db.sql<Model.Token[]>`
			UPDATE tokens 
			SET refresh_token = ${params.refresh_token} 
			WHERE user_id = ${params.user_id} 
			RETURNING *;
	`.then((data) => data[0]);
	}
}
