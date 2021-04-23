
import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../entities/Message";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate{
    chat: boolean;
    username: string;
}

class SettigService {

    private settingsRepository: Repository<Setting>;

    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username } : ISettingsCreate) {
        
        //Select * from settings where username = "username" limit 1
        const userAlreadyExists = await this.settingsRepository.findOne({username});

        if (userAlreadyExists) {
            throw new Error("User is not exists!");
        }

        const setting = this.settingsRepository.create({
            chat,
            username,
        });
    
        await this.settingsRepository.save(setting);

        return setting;
    }
}

export { SettigService };



