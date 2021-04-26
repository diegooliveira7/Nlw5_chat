
import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const userService = new UsersService();
    const messageService = new MessagesService();

    //Dando nome ao evento 
    socket.on("client_first_access", async (params) => {
        let user_id = null;
        const socket_id = socket.id;

        const { text, email } = params as IParams;//Aqui eu estou forçando que o retorno seja esses dois elementos da interface

        const userExist = await userService.findByEmail(email); 

        if(!userExist) {
            const user = await userService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id,
            });
            user_id = user.id;
        }else{
            user_id = userExist.id;

            const connection = await connectionsService.findByUserId(userExist.id);

            if (!connection){
                await connectionsService.create({
                    socket_id,
                    user_id: userExist.id,
                });
            }else{
                connection.socket_id = socket_id;
                await connectionsService.create(connection);//Nesse caso ele vai sobreescrever 
            }
        }

        await messageService.create({
            text,
            user_id
        });
        
    });
});


