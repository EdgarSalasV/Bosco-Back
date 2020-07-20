import { ConnectionOptions } from "typeorm";

export const dbOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "bainur",
  password: "password",
  database: "bitacora_db",
  entities: ["lib/entities/**/*.js"],
  logging: true,
  synchronize: false,
} as ConnectionOptions;
