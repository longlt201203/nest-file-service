import { MulterModule } from "@nestjs/platform-express";
import { FilesController } from "./files.controller";
import { FilesService } from "./files.service";
import { Module } from "@nestjs/common";
import { multerStorage } from "@utils";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileInfoEntity } from "@db/entities";

@Module({
	controllers: [FilesController],
	providers: [FilesService],
	exports: [FilesService],
	imports: [
		MulterModule.register({
			storage: multerStorage("uploads"),
		}),
		TypeOrmModule.forFeature([FileInfoEntity]),
	],
})
export class FilesModule {}
