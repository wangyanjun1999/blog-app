import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in.input';
import { PrismaService } from '../prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    // 找人
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    // 没找到
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // 密码不匹配
    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  // signIn(signInInput: SignInInput) {
  //   throw new Error('Method not implemented.');
  // }

  // 生成token
  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    console.log('在generateToken: ', payload);
    const accessToken = await this.jwtService.signAsync(payload);
    console.log('在generateToken-accessToken: ', accessToken);
    return accessToken;
  }

  async login(user: User) {
    console.log('[AuthService] Login started for user:', { 
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString() 
    });

    try {
      const accessToken = await this.generateToken(user.id);
      
      console.log('[AuthService] Token generated successfully for user:', {
        userId: user.id,
        tokenLength: accessToken.length,
        timestamp: new Date().toISOString()
      });

      return {
        accessToken,
        user,
      };
    } catch (error) {
      console.error('[AuthService] Login failed:', {
        userId: user.id,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}
