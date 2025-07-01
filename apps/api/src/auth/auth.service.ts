import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignInInput } from './dto/sign-in.input';
import { PrismaService } from '../prisma/prisma.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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

  signIn(signInInput: SignInInput) {
    throw new Error('Method not implemented.');
  }
  create(createAuthInput: CreateAuthInput) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
