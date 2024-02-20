import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Gatomigration1708459195494 implements MigrationInterface {

    public async up(oi: QueryRunner): Promise<void> {
        await oi.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await oi.createTable(new Table({
            name: 'tabelagato',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tabelagato')
    }

}
