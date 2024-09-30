import { AiService } from "./ai.service";
import { Module } from "@nestjs/common";
import { Env } from "@utils";
import OpenAI from "openai";

@Module({
	providers: [
		{
			provide: "OPEN_AI",
			useValue: new OpenAI({
				apiKey: Env.OPEN_AI_API_KEY,
			}),
		},
		AiService,
	],
})
export class AiModule {}
