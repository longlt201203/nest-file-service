import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UploadSingleFileRequest {
	@ApiProperty({ type: "string", format: "binary" })
	file: any;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	fileDisplayName?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	fileDescription?: string;
}
