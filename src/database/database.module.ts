import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 3001,
    username: 'postgres',
    password: 'docker',
    database: 'primeiroProjeto',
    entities: [],
    synchronize: true,
}

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    ... dataSourceOptions,
                }
            },
        }),
    ],
})
export class DatabaseModule {}
