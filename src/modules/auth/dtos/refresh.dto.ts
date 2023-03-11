import { Model } from "@modules/app/db/db.types";
import { check, cookie, param } from "express-validator";

export class RefreshDto {
	private constructor() {}

	static validate() {
		return [
			cookie("refresh_token")
				.notEmpty({ ignore_whitespace: true })
				.withMessage("refresh_token отсутствует в cookie"),
		];
	}
}
