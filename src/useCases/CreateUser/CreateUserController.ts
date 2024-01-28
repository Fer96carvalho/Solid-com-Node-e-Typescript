import { Request, Response } from "express";
import { CreateUSerUseCase } from "./CreateUserUseCase";

export class CreateUserController{
    constructor(
        private createUserUseCase: CreateUSerUseCase,
    ){}

    async handle( request: Request, response: Response): Promise<Response>{
        const {email, name, password} = request.body;
        try {
            await this.createUserUseCase.execute({
                name,
                email,
                password
            })

            return response.status(201).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unexpected error."
            })
        }
    }
}