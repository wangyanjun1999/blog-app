import { ObjectType, Field, Int } from '@nestjs/graphql';

import { User } from '../../user/entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  accessToken: string;

  @Field(() => User)
  user: User;
}