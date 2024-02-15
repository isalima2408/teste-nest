import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from 'src/gatos/entities/gatos.entity';
import { Tag } from 'src/gatos/entities/tag.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'primeiroProjeto',
    entities: [Gato, Tag],
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
