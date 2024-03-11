import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserTable1710131142434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "email",
                    type: "varchar"
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "token",
                    type: "varchar",
                    isNullable: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
