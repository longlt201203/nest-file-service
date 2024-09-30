import { SliceToImagesRequest } from "@modules/video/dto";
import { VideoService } from "./video.service";
import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("video")
@ApiTags("video")
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Post("slice-to-images")
	async sliceToImages(@Body() dto: SliceToImagesRequest) {
		await this.videoService.sliceToImages(dto);
		return "OK";
	}
}
