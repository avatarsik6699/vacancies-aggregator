import "reflect-metadata";
import { AuthController } from "./../auth/auth.controller";
import { TokenService } from "./../auth/services/token.service";
import { MailService } from "./../auth/services/mail.service";
import { Container } from "inversify";
import { REFERENCES } from "./app.references";
import { Database } from "./db/db";
import { IDatabase } from "./db/db.types";
import { UserRepository } from "entity/user/user.repository";
import { AuthService } from "@modules/auth/services/auth.service";
import { UserController } from "@modules/user/user.controller";
import { TokenRepository } from "entity/token/token.repository";
import { UserService } from "@modules/user/services/user.service";

const container = new Container();

// app
container.bind<IDatabase>(REFERENCES.Database).to(Database).inSingletonScope();

// common
container.bind<UserRepository>(REFERENCES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<TokenRepository>(REFERENCES.TokenRepository).to(TokenRepository).inSingletonScope();

// auth
container.bind<AuthController>(REFERENCES.AuthController).to(AuthController).inSingletonScope();
container.bind<AuthService>(REFERENCES.AuthService).to(AuthService).inSingletonScope();
container.bind<MailService>(REFERENCES.MailService).to(MailService).inSingletonScope();
container.bind<TokenService>(REFERENCES.TokenService).to(TokenService).inSingletonScope();

// user
container.bind<UserController>(REFERENCES.UserController).to(UserController).inSingletonScope();
container.bind<UserService>(REFERENCES.UserService).to(UserService).inSingletonScope();

export { container };
