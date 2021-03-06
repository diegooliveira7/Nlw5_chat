document.querySelector("#start_chat").addEventListener("click", (event) => {
    const socket = io();//Testat conexão

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";//Ocultar outro campo

    const chat_in_suport = document.getElementById("chat_in_support");
    chat_in_suport.style.display = "block";
    

    const email = document.getElementById("email").value;
    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {//Criando objeto
            email,
            text,
        };

        socket.emit("client_first_access", params, (call, err) => {//emitir um evento, com isso receber uma chamada ou um erro
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        });
    });
});