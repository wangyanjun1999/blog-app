import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => String)
  password: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Post])
  posts?: Post[];

  @Field(() => [Comment])
  comments?: Comment[];

  @Field(() => [Like])
  likes?: Like[];
}
