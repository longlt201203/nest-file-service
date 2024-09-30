import { Inject, Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class AiService {
	constructor(
		@Inject("OPEN_AI")
		private readonly client: OpenAI,
	) {}
}
