/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const env = {
	SERVER_PORT: Number(process.env.SERVER_PORT) || 3333,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

	SMTP_HOST: process.env.SMTP_HOST!,
	SMTP_PORT: Number(process.env.SMTP_PORT)!,
	SMTP_USER: process.env.SMTP_USER!,
	SMTP_PASSWORD: process.env.SMTP_PASSWORD!,

	API_URL: process.env.API_URL!,
	CLIENT_URL: process.env.CLIENT_URL!,

	DB_USER: process.env.DB_USER!,
	DB_PASSWORD: process.env.DB_PASSWORD!,
	DB_HOST: process.env.DB_HOST!,
	DB_DATABASE: process.env.DB_DATABASE!,
	DB_PORT: Number(process.env.DB_PORT!),
};
