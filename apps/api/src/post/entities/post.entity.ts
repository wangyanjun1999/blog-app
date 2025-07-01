import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Like } from 'src/like/entities/like.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => String)
  slug?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  author: User;

  @Field(() => [Tag])
  tags?: Tag[];

  @Field(() => [Comment])
  comments?: Comment[];

  @Field(() => [Like])
  likes?: Like[]; 
}
