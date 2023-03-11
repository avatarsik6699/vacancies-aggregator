import { injectable } from "inversify";
import { env } from "@shared/services/env";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@injectable()
export class MailService {
	transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		this.transport = nodemailer.createTransport({
			service: "gmail",
			host: env.SMTP_HOST,
			port: env.SMTP_PORT,
			secure: false,
			auth: {
				type: "login",
				user: env.SMTP_USER,
				pass: env.SMTP_PASSWORD,
			},
		});
	}

	sendVerificationLinkToMail = async (to: string, link: string) => {
		this.transport.sendMail({
			from: env.SMTP_USER,
			to,
			subject: `Активация аккаунта на ${env.API_URL}`,
			text: "Какой то текст для теста",
			// TODO: сделать нормальную верстку
			html: `
				<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
		});
	};

	getVerificationLink = () => {
		return uuidv4();
	};
}
