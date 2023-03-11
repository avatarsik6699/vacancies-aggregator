import { Model } from "@modules/app/db/db.types";
import { body } from "express-validator";

export class LoginDto implements Required<Pick<Model.User, "login" | "password">> {
	private constructor(public readonly login: string, public readonly password: string) {}

	public to() {
		return {
			login: this.login,
			password: this.password,
		};
	}

	static from(data: LoginDto) {
		return new LoginDto(data.login, data.password);
	}

	static validate() {
		return [
			body("login")
				.notEmpty({ ignore_whitespace: true })
				.withMessage("Логин не может быть пустым.")
				.isLength({ max: 50 })
				.withMessage("Длина Логина не может быть более 50 символов"),
			body("password")
				.notEmpty({ ignore_whitespace: true })
				.withMessage("Пароль не может быть пустым.")
				.isLength({ max: 50 })
				.withMessage("Длина пароля не может быть более 50 символов"),
		];
	}
}
