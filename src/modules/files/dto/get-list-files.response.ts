import { FileInfoResponse } from "./file-info.response";
import { ApiProperty } from "@nestjs/swagger";

export class GetListFileResponse {
	@ApiProperty({ type: FileInfoResponse, isArray: true })
	list: FileInfoResponse[];

	@ApiProperty({ required: false })
	nextCursor?: number;

	static from(
		list: FileInfoResponse[],
		nextCursor?: number,
	): GetListFileResponse {
		return {
			list: list,
			nextCursor: nextCursor,
		};
	}
}
