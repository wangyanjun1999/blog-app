import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Post])
  posts?: Post[];
}
