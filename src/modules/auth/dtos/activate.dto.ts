import { Model } from "@modules/app/db/db.types";
import { check, param } from "express-validator";

export class ActivateDto {
	private constructor(public readonly verification_link: string) {}

	static from(data: ActivateDto) {
		return new ActivateDto(data.verification_link);
	}

	static validate() {
		return [
			param("verification_link")
				.notEmpty({ ignore_whitespace: true })
				.isString()
				.withMessage("Ссылка для активации отсутствует."),
		];
	}
}
