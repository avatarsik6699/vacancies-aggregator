import { Model } from "@modules/app/db/db.types";
import { SharedTypes, Utils } from "@shared/types/types";

type IUser = Utils.WithOptional<
	Pick<Model.User, "id" | "login" | "email" | "is_verified">,
	"is_verified"
>;

export class UserDto implements IUser, SharedTypes.Dto<IUser> {
	private constructor(
		public readonly id: number,
		public readonly login: string,
		public readonly email: string,
		public readonly is_verified: boolean = false,
	) {}

	to() {
		return {
			id: this.id,
			login: this.login,
			email: this.email,
			is_verified: this.is_verified,
		};
	}

	static from(data: IUser) {
		return new UserDto(data.id, data.login, data.email, data.is_verified);
	}

	static fromMany(data: IUser[]) {
		return data.map((item) => new UserDto(item.id, item.login, item.email, item.is_verified));
	}
}
