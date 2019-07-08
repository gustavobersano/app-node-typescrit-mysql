"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.cnn = mysql_1.default.createConnection({
            host: "localhost",
            user: "node_user",
            password: "123456",
            database: "node_db"
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instacia || (this._instacia = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, field) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback("EL registro solicitado no existe.");
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log("Error: ", err.message);
            }
            this.conectado = true;
            console.log("Base de datos online!");
        });
    }
}
exports.default = MySQL;
