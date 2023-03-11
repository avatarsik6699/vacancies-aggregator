import { REFERENCES } from "@modules/app/app.references";
import { ApiError } from "@shared/exceptions/api-error";
import { UserDto } from "entity/user/user.dto";
import { UserRepository } from "entity/user/user.repository";
import { inject, injectable } from "inversify";
import { GetOneUserDto } from "../dtos/getOneUser.dto";

@injectable()
export class UserService {
	@inject(REFERENCES.UserRepository) userRepository: UserRepository;

	async getUser(dto: GetOneUserDto) {
		const user = await this.userRepository.findOne({ id: dto.id });

		if (!user) throw ApiError.BadRequest(`Пользователь с id ${dto.id} не найден.`);

		return UserDto.from(user);
	}

	async getUsers() {
		const users = await this.userRepository.findAll();

		return UserDto.fromMany(users);
	}
}
