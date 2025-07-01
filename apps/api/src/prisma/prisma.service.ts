import { Injectable, OnModuleInit   } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  // 在进行注入的时候，连接数据库
/********************************************
 * NESTAPP      USERMODULE      USERSERVICE *
 *    |               |               |     *
 *    |    启动       |               |     *
 *    |-------------->|               |     *
 *    |               |  创建         |     *
 *    |               |-------------> |     *
 *    |               |  注入依赖     |     *
 *    |               |-------------> |     *
 *    |               | 检查ONMODULEINIT    *
 *    |               |-------------> |     *
 *    |               | 调用ONMODULEINIT    *
 *     |               |<-------------|     *
 *    |               | 初始化完成     |    *
 *    |<--------------|               |     *
 ********************************************/
  async onModuleInit() {
    await this.$connect();
  }

}

