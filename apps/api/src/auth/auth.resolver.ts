import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { User } from '../user/entities/user.entity';
import { AuthPayload } from './entities/auth-payload.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    // 验证
    const user = await this.authService.validateLocalUser(signInInput);
    // 没问题返回+jwt
    return this.authService.login(user);
  }
}
