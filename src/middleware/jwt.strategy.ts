import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entity/user.entity";
import { Repository } from "typeorm";
import * as dotenv from 'dotenv'
dotenv.config()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpriation: false,
            secretOrKey: process.env.JWT_ACCESSTOKEN_SECRET_KEY,
        })
    }

    async validate(payload) {
        const {username} = payload;
        const user = await this.userRepository.findOne({username})
        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}