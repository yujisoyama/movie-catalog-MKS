import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.usersService.getUserByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, created_at, ...loggedUser } = user;
            return loggedUser;
        }

        return null;
    }

    async login(user: Partial<User>) {
        const payload = { id: user.id, name: user.name, email: user.email }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
