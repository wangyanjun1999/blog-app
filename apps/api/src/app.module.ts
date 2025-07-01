import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 指定.env文件路径，默认会从项目根目录加载.env文件
      // 如果.env文件不在根目录，需要指定完整路径如'config/.env'
      envFilePath: '.env',
      
      // 设置为true使配置模块全局可用
      // 这样其他模块无需再次导入ConfigModule即可使用配置服务
      isGlobal: true,

      // 其他可选参数说明:
      // ignoreEnvFile: false, // 是否完全忽略.env文件，默认false
      // ignoreEnvVars: false, // 是否忽略process.env中的变量，默认false 
      // load: [configuration] // 可以加载自定义配置提供器
      // validationSchema: Joi.object({...}) // 使用Joi验证环境变量格式
      // validationOptions: { allowUnknown: true } // 验证选项
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
