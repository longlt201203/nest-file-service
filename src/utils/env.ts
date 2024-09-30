import { config } from "dotenv";

config();

export const Env = {
	LISTEN_PORT: parseInt(process.env.LISTEN_PORT || "3000"),

	DB_PATH: process.env.DB_PATH || "database.db",

	ENABLE_SWAGGER: (process.env.ENABLE_SWAGGER || "false") == "true",

	OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY || "",
} as const;

console.log(Env);
