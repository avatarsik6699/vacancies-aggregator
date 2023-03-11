import { Model } from "@modules/app/db/db.types";
import { check, cookie } from "express-validator";

export class LogoutDto {
	private constructor() {}

	static validate() {
		return [
			cookie("refresh_token")
				.notEmpty({ ignore_whitespace: true })
				.withMessage("refresh_token отсутствует в cookie"),
		];
	}
}
