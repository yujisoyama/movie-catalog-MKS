import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        const user = await this.usersService.getUserByEmail(email);
        
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, created_at, ...loggedUser } = user;
            return loggedUser;
        }

        return null;
    }
}
