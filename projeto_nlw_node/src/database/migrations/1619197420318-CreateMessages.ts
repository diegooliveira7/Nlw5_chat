import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1619197420318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"messages",
                columns: [
                    {
                        name: "id",
                        type: "uuind",
                        isPrimary: true,
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "text",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKUser",//Pode ser qualquer nome
                        referencedTableName: "users",//O nome da tabela que estou referencimando 
                        referencedColumnNames: ["id"],//O campo que estou refrenciando da tabela tal
                        columnNames: ["user_id"],//e qual campo da tabela tal corresponde com o meu campo
                        //Esse campo defini o que vai acontecer se o usuário for deletado
                        onDelete: "SET NULL",//Nesse caso se o usuário for excluido ele vai setar como nulo o campo
                        onUpdate: "SET NULL", //E atualizar o campo
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}
