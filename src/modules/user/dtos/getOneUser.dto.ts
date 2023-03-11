import { Model } from "@modules/app/db/db.types";
import { UserDto } from "entity/user/user.dto";
import { check } from "express-validator";

export class GetOneUserDto implements Pick<Model.User, "id"> {
	private constructor(public readonly id: number) {}

	static from(data: GetOneUserDto) {
		return new GetOneUserDto(data.id);
	}

	static validate() {
		return [
			check("id")
				.notEmpty({ ignore_whitespace: true })
				.withMessage("Пропущен обязательный параметр id.")
				.isNumeric()
				.withMessage("id должен быть числом."),
		];
	}
}
