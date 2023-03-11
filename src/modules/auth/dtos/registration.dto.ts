import { Model } from "@modules/app/db/db.types";
import { ApiError } from "@shared/exceptions/api-error";
import { UserDto } from "entity/user/user.dto";
import { check } from "express-validator";

export class RegistrationDto implements Required<Pick<Model.User, "login" | "email" | "password">> {
	private constructor(
		public readonly login: string,
		public readonly email: string,
		public readonly password: string,
	) {}

	static from(data: RegistrationDto) {
		return new RegistrationDto(data.login, data.email, data.password);
	}

	static validate() {
		return [
			check("login").notEmpty({ ignore_whitespace: true }).isLength({ min: 3, max: 50 }),
			check("email").notEmpty({ ignore_whitespace: true }).isLength({ min: 1, max: 50 }),
			check("password").notEmpty({ ignore_whitespace: true }).isLength({ min: 1, max: 50 }),
			check("passwordConfirm")
				.trim()
				.custom(async (passwordConfirm, { req }) => {
					if (req.body["password"] !== passwordConfirm) {
						throw ApiError.BadRequest("Пароли не совпадают");
					}
				}),
		];
	}
}
