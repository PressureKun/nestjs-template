import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    /**
     * Возвращаем просто email потому что вся валидация будет происходить
     * еще на этапе попадания в класс за счет екстенда
     */
    async validate({ email }: Pick<UserModel, 'email'>) {
        return email;
    }
}
