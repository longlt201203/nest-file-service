import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditFileInfoRequest {
	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	displayName?: string;

	@ApiProperty({ required: false })
	@IsString()
	@IsOptional()
	description?: string;
}
