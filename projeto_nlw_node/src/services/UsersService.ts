import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";


class UsersService{

    private userRepository: Repository<User>;

    constructor(){
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
        //Verificar se o usuário existe
        
        const userExists = await this.userRepository.findOne({
            email,
        });

        //Se existe retorna o usuário
        if (userExists) {
            return userExists;
        }

        const user = this.userRepository.create({
            email,
        });

        await this.userRepository.save(user);

        return user;
    }
    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({ email });
    
        return user;
    }
}

export { UsersService };
