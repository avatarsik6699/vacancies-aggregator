import { Model } from "@modules/app/db/db.types";
import { SharedTypes } from "@shared/types/types";

type IToken = Pick<Model.Token, "id" | "refresh_token">;

export class TokenDto implements IToken, SharedTypes.Dto<IToken> {
	private constructor(public readonly id: number, public readonly refresh_token: string) {}

	to() {
		return {
			id: this.id,
			refresh_token: this.refresh_token,
		};
	}

	static from(data: Model.Token) {
		return new TokenDto(data.id, data.refresh_token);
	}
}
