import { MailService } from "./mail.service";
import { inject, injectable } from "inversify";
import { REFERENCES } from "@modules/app/app.references";
import { UserRepository } from "entity/user/user.repository";
import { ApiError } from "@shared/exceptions/api-error";
import { utils } from "@shared/utils";
import { RegistrationDto } from "../dtos/registration.dto";
import { UserDto } from "entity/user/user.dto";
import { env } from "@shared/services/env";
import { LoginDto } from "../dtos/login.dto";
import bcrypt from "bcryptjs";
import { ActivateDto } from "../dtos/activate.dto";

@injectable()
export class AuthService {
	@inject(REFERENCES.UserRepository) private readonly userRepository: UserRepository;
	@inject(REFERENCES.MailService) private readonly mailService: MailService;

	async createUserIfNotExists(dto: RegistrationDto) {
		const isUserExists = await this.userRepository.findOne(dto);

		if (!isUserExists) {
			const dataToCreate = {
				login: dto.login,
				email: dto.email,
				is_verified: false,
				verification_link: this.mailService.getVerificationLink(),
				password: await utils.asyncBcrypt(dto.password),
			};

			const createdUser = await this.userRepository.create(dataToCreate);

			// TODO: переделать на events
			this.mailService.sendVerificationLinkToMail(
				dataToCreate.email,
				`${env.API_URL}/api/user/activate/${dataToCreate.verification_link}`,
			);

			return UserDto.from(createdUser);
		} else {
			throw ApiError.BadRequest("Пользователь с такой почтой или логином уже существует.");
		}
	}

	async updateUserEmailVerificationStatus({ verification_link }: ActivateDto) {
		const user = await this.userRepository.findOne({ verification_link });

		if (!user) throw ApiError.BadRequest(`Пользователь c данной ссылкой не найден.`);

		const updatedUser = await this.userRepository.update({
			...user,
			is_verified: true,
		});

		if (!updatedUser) throw ApiError.BadRequest(`Не удалось обновить данные пользователя.`);

		return UserDto.from(updatedUser);
	}

	async getUserByLogin({ login, password }: LoginDto) {
		const user = await this.userRepository.findOne({ login });

		if (!user) throw ApiError.BadRequest(`Пользователь с логином ${login} не найден.`);

		await this.checkPassword({ password, userPassword: user.password });

		return UserDto.from(user);
	}

	private async checkPassword(params: Pick<LoginDto, "password"> & { userPassword: string }) {
		const isPassEquals = await bcrypt.compare(params.password, params.userPassword);

		if (!isPassEquals) throw ApiError.BadRequest("Пароль введен неверно.");
	}
}
