import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { User } from "./entities/User.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    async login(dto: LoginDto) {
        const user = await this.repository.findOne({
            where: { login: dto.login },
        });
        console.log(dto);

        if (!user)
            throw new UnauthorizedException({
                message: "Такого логина не существует",
            });

        if (dto.password !== user.password)
            throw new UnauthorizedException({ message: "Пароль не верный" });

        const token = this.generateToken(user);

        return { token, user };
    }

    async auth(token: string) {
        const id = token.split("_")[0];
        const login = token.split("_")[1];
        const role = token.split("_")[2];

        if (!id || !login || !role)
            throw new UnauthorizedException({
                message: "Пользователь не авторизован",
            });

        const user = await this.repository.findOne({
            where: { login: login },
        });

        if (!user)
            throw new UnauthorizedException({
                message: "Нет такого пользователя",
            });
        
        const newToken = this.generateToken(user);
        return { token: newToken, user };
    }

    private generateToken(user: User) {
        const token: string = user.id + "_" + user.login + "_" + user.role;
        return token;
    }
}
