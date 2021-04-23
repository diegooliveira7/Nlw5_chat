
import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate{
    admin_id?: string;//Esse ponto de interrogação serve para sinalizar que se o admin não vier que é para salvar do mesmo jeito
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository: Repository<Message>;

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({ admin_id, text, user_id}: IMessageCreate){
        //const messagesRepository = getCustomRepository(MessagesRepository);

        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id,
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string ){
        
        const list = await this.messagesRepository.find({
            where: {user_id},//Junto com as mensagens, ele está trazendo o objeto
            relations: ["user"],
        });//find retorna uma lista

        return list;
    }
}

export { MessagesService };
