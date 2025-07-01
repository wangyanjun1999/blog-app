import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;
}
