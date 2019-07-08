import mysql from "mysql";

export default class MySQL {
  private static _instacia: MySQL;

  cnn: mysql.Connection;
  conectado: boolean = false;

  constructor() {
    console.log("Clase inicializada");

    this.cnn = mysql.createConnection({
      host: "localhost",
      user: "node_user",
      password: "123456",
      database: "node_db"
    });

    this.conectarDB();
  }

  public static get instance() {
    return this._instacia || (this._instacia = new this());
  }

  static ejecutarQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], field) => {
      if (err) {
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) {
        callback("EL registro solicitado no existe.");
      } else {
        callback(null, results);
      }
    });
  }

  private conectarDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log("Error: ", err.message);
      }
      this.conectado = true;
      console.log("Base de datos online!");
    });
  }
}
