import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FilesService } from "./files.service";
import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Res,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
	DeleteFilesRequest,
	EditFileInfoRequest,
	GetListFileResponse,
	GetListFilesQuery,
	UploadSingleFileRequest,
} from "./dto";
import { ApiResponseDto } from "@utils";
import { Response } from "express";

@Controller("files")
@ApiTags("files")
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get("list")
	async getListFiles(@Query() query: GetListFilesQuery) {
		const [files, nextCursor] = await this.filesService.getListFiles(query);
		return new ApiResponseDto(
			GetListFileResponse.from(files, nextCursor),
			null,
			"Success!",
		);
	}

	@Get(":id")
	async getFile(@Param("id") id: string, @Res() res: Response) {
		const fileInfo = await this.filesService.getFileInfo(+id);
		res.sendFile(fileInfo.path, {
			root: process.cwd(),
		});
	}

	@Post("single")
	@UseInterceptors(FileInterceptor("file"))
	@ApiConsumes("multipart/form-data")
	async uploadSingleFile(
		@UploadedFile() fileInfo: Express.Multer.File,
		@Body() dto: UploadSingleFileRequest,
	) {
		await this.filesService.createInfo(fileInfo, dto);
		return new ApiResponseDto(null, null, "Success!");
	}

	@Patch("info/:id")
	async editFileInfo(
		@Param("id") id: string,
		@Body() dto: EditFileInfoRequest,
	) {
		await this.filesService.updateInfo(+id, dto);
		return new ApiResponseDto(null, null, "Success!");
	}

	@Post("delete-list")
	async deleteFiles(@Body() dto: DeleteFilesRequest) {
		await this.filesService.deleteFiles(dto);
		return new ApiResponseDto(null, null, "Success!");
	}
}
