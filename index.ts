import { inject, injectable, Container } from 'inversify';
import 'reflect-metadata';
export interface IEmailService {
	sendEmail(to: string, subject: string, body: string): void;
}

export interface ISmtpClient {
	send(to: string, from: string, subject: string, body: string): void;
}

@injectable()
export class SmtpClient implements ISmtpClient {
	send(to: string, from: string, subject: string, body: string): void {
		console.log(
			`Sending email to ${to} with subject "${subject}" and body "${body}" from ${from}`
		);
	}
}

@injectable()
export class EmailService implements IEmailService {
	private smtpClient: ISmtpClient;

	constructor(@inject('ISmtpClient') smtpClient: ISmtpClient) {
		this.smtpClient = smtpClient;
	}

	sendEmail(to: string, subject: string, body: string): void {
		this.smtpClient.send(to, 'noreply@example.com', subject, body);
	}
}

const container = new Container();

container.bind<IEmailService>('IEmailService').to(EmailService);
container.bind<ISmtpClient>('ISmtpClient').to(SmtpClient);

const emailService = container.get<IEmailService>('IEmailService');

emailService.sendEmail('example@example.com', 'Test Subject', 'Test Body');
