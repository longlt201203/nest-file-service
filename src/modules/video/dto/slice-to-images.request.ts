import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class SliceToImagesRequest {
	@ApiProperty()
	@IsNumber()
	fileId: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	frameRate?: number;
}
