import { User } from "../../entities/Users";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreatUserRequestDTO } from "./CreateUserDTO";

export class CreateUSerUseCase {
    constructor(
         private usersRepository: IUsersRepository,
         private mailProvider: IMailProvider, 
    ){}


    async execute(data: ICreatUserRequestDTO){
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email)
        if (userAlreadyExists){
            throw new Error('User already exists.')
        }

        const user: User = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Empresa Fanstasia',
                email: 'equipe.suporte@empresa.com'
            },
            subject: 'Cadastro realizado com suceso!',
            body: 'Seu cadastro foi aprovado, bla bla bla bla!'
        })
    }
}