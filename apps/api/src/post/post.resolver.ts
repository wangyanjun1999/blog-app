import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @Mutation(() => Post)
  // createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
  //   return this.postService.create(createPostInput);
  // }
  @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' }) // 查询所有文章 querty{ posts }
  findAll(@Context() context) {
    // console.log('在post.resolver-context: ', context);
    const contextReq = context.req;
    console.log('在post.resolver-contextReq: ', contextReq);
    // const user = contextReq.user;
    // console.log('在post.resolver-user: ', user);
    return this.postService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
