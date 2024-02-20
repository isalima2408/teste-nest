import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from 'src/gatos/entities/gatos.entity';
import { Tag } from 'src/gatos/entities/tag.entity';
import { Gatomigration1708459195494 } from 'src/migration/1708459195494-gatomigration';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'teste',
    database: 'teste',
    entities: [Gato, Tag],
    synchronize: false,
    migrations: [Gatomigration1708459195494]
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
