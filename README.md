# prisma部分

> https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres

0. env
1. scheme编写

To map your data model to the database schema, you need to use the prisma migrate CLI commands:

`npx prisma migrate dev --name init`

> It creates a new SQL migration file for this migration
> It runs the SQL migration file against the database

2. 推送
   https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql

3.查看
`pnpx prisma studio`

4.nestjs创建prisma模块

> 默认generate目录

5.seeding


6. graphql

- nest g res user 
- 修改 entities
- playground


7. authentication
jwt

8.protected endpoint