import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable17101311424341710143943932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the user table
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

        return Promise.resolve();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the user table
        await queryRunner.dropTable("user");

        return Promise.resolve();
    }

}
