
import { Entity, PrimaryColumn, Column ,CreateDateColumn } from "typeorm";
//Versão 4 é número aleatório e eu estou subescrevendo com o nome uuid
import { v4 as uuid} from "uuid";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };
