import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class GetListFilesQuery {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	@Type(() => Number)
	cursor?: number;

	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	limit?: number;
}
