import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class DeleteFilesRequest {
	@ApiProperty({ type: Number, isArray: true })
	@IsNumber({}, { each: true })
	ids: number[];
}
