import { VideoInfoEntity, VideoSlicingEntity } from "@db/entities";
import { FilesService } from "@modules/files";
import { SliceToImagesRequest } from "./dto";
import { Injectable } from "@nestjs/common";
import * as ffmpeg from "ffmpeg";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoInfoEntity)
		private readonly videoInfoRepository: Repository<VideoInfoEntity>,
		@InjectRepository(VideoSlicingEntity)
		private readonly videoSlicingRepository: Repository<VideoSlicingEntity>,
		private readonly fileService: FilesService,
	) {}

	async sliceToImages(dto: SliceToImagesRequest) {
		const fileInfo = await this.fileService.getFileInfo(dto.fileId);
		const video = await new ffmpeg(fileInfo.path);
		// await this.videoInfoRepository.save({
		//     fileInfo: { id: fileId },
		//     ffmpegInfoJson: JSON.stringify(video.metadata),
		//     createdAt: Date.now()
		// });
		video
			.fnExtractSoundToMP3("uploads/tests-mp3.mp3")
			.then((value) => {
				console.log(value);
			})
			.catch((err) => {
				console.log(err);
			});
		video
			.fnExtractFrameToJPG("tests-img", {
				frame_rate: dto.frameRate || 0.25,
			})
			.then(async (arr) => {
				console.log(arr);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
