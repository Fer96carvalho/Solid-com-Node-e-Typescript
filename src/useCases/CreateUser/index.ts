import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { PostgresUSersRepository } from "../../repositories/implementations/PostgresUsersReposiroty";
import { CreateUserController } from "./CreateUserController";
import { CreateUSerUseCase } from "./CreateUserUseCase";

const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUSersRepository = new PostgresUSersRepository();

const createUserUseCase = new CreateUSerUseCase(
    postgresUSersRepository,
    mailTrapMailProvider
);

const createUserController = new CreateUserController(
    createUserUseCase,
);

export { createUserUseCase, createUserController};