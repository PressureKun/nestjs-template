import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { USER_NOT_FOUND, USER_PASSWORD_INCORRECT } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
        private readonly jwtService: JwtService,
    ) {}

    async createUser(dto: AuthDto) {
        const salt = genSaltSync(10);

        const userCreated = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt),
        });

        return userCreated.save();
    }

    async findUser(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
        const user = await this.findUser(email);

        if (!user) {
            throw new UnauthorizedException(USER_NOT_FOUND);
        }

        const isPasswordCorrect = await compare(password, user.passwordHash);

        if (!isPasswordCorrect) {
            throw new UnauthorizedException(USER_PASSWORD_INCORRECT);
        }

        return { email: user.email };
    }

    async login(email: string) {
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
