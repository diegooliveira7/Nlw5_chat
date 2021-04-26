//Preciso importar o meu express
import express, { response } from "express";//Os três pontinhos, significa que preciso fazer a tipagem
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import path from "path";//Para acessar pastas

import "./database";
import { routes } from "./routes";
//É o servidor 
const app = express();

//Vou buscar uma pasta no meu diretório atual, mas volte uma pasta
app.use(express.static(path.join(__dirname,"..","public")));
//Vou definir que as minhas views estão na pasta public
app.set("views", path.join(__dirname, "..", "public"));
//Vou definir o padrão
app.engine("html", require("ejs").renderFile);//módulo ejs
app.set("view engine", "html");

//Somente para teste
app.get("/pages/client", (request, response) =>{
    return response.render("html/client.html");
});

const http = createServer(app);//Criando protocolo http
const io = new Server(http);//Criando protocolo ws

io.on("connection", (socket: Socket) => {
    //console.log("Se conectou", socket.id);
});

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

export {http, io}