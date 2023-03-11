export const REFERENCES = {
	Database: Symbol.for("Database"),

	// user
	UserController: Symbol.for("UserController"),
	UserService: Symbol.for("UserService"),

	// common
	UserRepository: Symbol.for("UserRepository"),
	TokenRepository: Symbol.for("TokenRepository"),

	// auth
	AuthController: Symbol.for("AuthController"),
	MailService: Symbol.for("MailService"),
	AuthService: Symbol.for("AuthService"),
	TokenService: Symbol.for("TokenService"),
};
