
import { Entity, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn} from "typeorm";

//Versão 4 é número aleatório e eu estou subescrevendo com o nome uuid
import { v4 as uuid} from "uuid";

@Entity("settings")
class Setting{

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export {Setting};


