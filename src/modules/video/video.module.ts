import { FilesModule } from "@modules/files";
import { VideoService } from "./video.service";
import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VideoInfoEntity, VideoSlicingEntity } from "@db/entities";

@Module({
	imports: [
		TypeOrmModule.forFeature([VideoInfoEntity, VideoSlicingEntity]),
		FilesModule,
	],
	controllers: [VideoController],
	providers: [VideoService],
	exports: [VideoService],
})
export class VideoModule {}
