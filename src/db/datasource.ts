import { Env } from "../utils";
import { DataSource } from "typeorm";

// Edit this
export const datasource = new DataSource({
	type: "sqlite",
	database: Env.DB_PATH,
	entities: [__dirname + "/entities/*.entity{.ts,.js}"],
	migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
