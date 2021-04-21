//Preciso importar o meu express
import express, { response } from "express";//Os três pontinhos, significa que preciso fazer a tipagem

import "./database";
import { routes } from "./routes";
//É o servidor 
const app = express();

app.use(express.json());//Demonstra que pode vim um json
/**
 * GET = Buscas
 * POST = Criação
 * PUT = Alteração
 * DELETE = Delete
 * PATCH = Alterar
 * 
 * */

//Fazer uma requisição

// app.get("/", (request, response) => {//Rota e parametros
//     return response.send("Olé Diego");
// });

// app.post("/user", (request,response) => {
//     return response.json({
//         message: "Usuário salvo!"
//     });
// });

app.use(routes);

//Definir uma porta
app.listen(3333, () => console.log("Server is running on port 3333"));//Mais uma mensagem de que confirmação



