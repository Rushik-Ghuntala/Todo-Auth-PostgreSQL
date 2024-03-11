import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class TodoTable1710131148174 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the to do table
        await queryRunner.createTable(new Table({
            name: "todo",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "title",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "userId",
                    type: "int"
                }
            ]
        }), true);

        // Add foreign key constraint for userId
        const todoTable = await queryRunner.getTable("todo");
        if (todoTable) {
            await queryRunner.createForeignKey("todo", new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE"
            }));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint for userId
        const todoTable = await queryRunner.getTable("todo");
        const foreignKey = todoTable?.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
        
        if (todoTable && foreignKey) {
            await queryRunner.dropForeignKey("todo", foreignKey);
        }

        // Drop the Todo table
        await queryRunner.dropTable("todo");
    }
}
