import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1618978203527 implements MigrationInterface {

    //toda vez que rodar o yarn typeorm migration:run ele vai rodar o que estiiver em up
    public async up(queryRunner: QueryRunner): Promise<void> {
        //Criar uma tabela
        await queryRunner.createTable(
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",//Ele faz que se qualquer alteração acontecer já muda
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );
    }

    //Se por acaso depois eu perceber que fiz coisa errada eu digito  yarn typeorm migration:revert que vai rodar o código de baixo
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}
