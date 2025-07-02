import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    // 使用异步方式配置JWT模块，以便在运行时动态获取配置
    JwtModule.registerAsync({
      // 需要导入ConfigModule以使用配置服务
      imports: [ConfigModule],
      
      // 注入ConfigService依赖，用于读取环境变量
      inject: [ConfigService],
      
      // 工厂函数，实际配置逻辑
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET') ;
        if (!secret) {
          throw new Error('JWT_SECRET is not defined');
        }
        console.log('在ConfigService-secret: ', secret);
        return {
          secret,
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      }
    }),
  ],

  // 这里不需要注入JwtService，因为JwtModule已经自动注入
  providers: [AuthResolver, AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
