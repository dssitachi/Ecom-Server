// If any error happens, check if there is any name collision
// https://docs.nestjs.com/techniques/configuration

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'containers-us-west-209.railway.app',
    port: 6366,
    username: 'postgres',
    password: 'gMQ42g75QjnOUPyLciQB',
    database: 'railway',
    autoLoadEntities: true,
    synchronize: true,
}
