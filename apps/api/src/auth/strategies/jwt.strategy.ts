import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthJwtPayload } from "../types/auth-jwtPayload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService, 
        private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }

    async validate(payload: AuthJwtPayload) {
        const userId = payload.sub;
        return this.authService.validateJwtUser(userId);
    }
}   