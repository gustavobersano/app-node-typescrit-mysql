import Server from "./server/server";
import router from "./router/router";
import MySQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(router);

// MySQL Instance
// MySQL.instance;



server.start(() => {
    console.log("Server corriendo en el puerto 3000");
});

