import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/users/user.entity';
import { Repository } from 'typeorm';
import { ICreateUser, ICreateUserError } from './interfaces/user.interfaces';

import * as bcrypt from 'bcrypt';
import { verifyStringIsEmpty } from 'src/utils/verifyStringIsEmpty';
import { verifyInvalidEmail } from 'src/utils/verifyInvalidEmail';
import { verifyPasswordLength } from 'src/utils/verifyPasswordLength';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async createUser(createUser: ICreateUser): Promise<string | ICreateUserError> {
        if (verifyStringIsEmpty(createUser.name)) {
            return {
                message: "O seu nome não pode ser nulo.",
                property: "name"
            }
        }

        if (verifyInvalidEmail(createUser.email)) {
            return {
                message: "Email inválido. Está faltando o @.",
                property: "email"
            }
        }

        const emailAlreadyUsing = await this.userRepository.createQueryBuilder("user")
            .where("LOWER(user.email) = LOWER(:email)", { email: createUser.email })
            .getOne();

        if (emailAlreadyUsing) {
            return {
                message: "Este email já está sendo usado.",
                property: "email"
            }
        }

        if (verifyPasswordLength(createUser.password, 6)) {
            return {
                message: "A senha deve conter pelo menos 6 caracteres",
                property: "password"
            }
        }

        const hashedPassword = await bcrypt.hash(createUser.password, 10);

        const newUser = this.userRepository.create({ ...createUser, password: hashedPassword });
        await this.userRepository.save(newUser);
        return "O usuário foi criado com sucesso!";
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email });
    }
}
