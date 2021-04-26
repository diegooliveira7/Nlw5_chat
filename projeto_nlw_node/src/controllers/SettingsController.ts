
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";
import { SettigService } from "../services/SettingsService";

class SettingsController{

    async create(request: Request, response: Response) {
        const { chat, username } = request.body;//desestruturando

        const settingsService = new SettigService();

        try {
            const setting = await settingsService.create({ chat, username });
    
            return response.json(setting); 
        } catch (error) {//Quando o erro subir para a camada superior ele captura e manda como json para o cliente
            return response.status(400).json({
                message: error.message,
            });
        }
    }

    async findByUsername(request: Request, response: Response) {
        const { username } = request.params;

        const settingsService = new SettigService();

        const settings = await settingsService.findByUsername(username);

        return response.json(settings);
    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;

        const settingsService = new SettigService();

        const settings = await settingsService.update(username, chat);
        return response.json(settings);
    }

}

export { SettingsController };



