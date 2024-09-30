import { FileInfoEntity } from "@db/entities";
import {
	DeleteFilesRequest,
	EditFileInfoRequest,
	GetListFilesQuery,
	UploadSingleFileRequest,
} from "./dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, LessThan, Repository } from "typeorm";
import * as fs from "fs";

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(FileInfoEntity)
		private readonly fileInfoRepository: Repository<FileInfoEntity>,
	) {}

	async createInfo(
		fileInfo: Express.Multer.File,
		dto: UploadSingleFileRequest,
	) {
		await this.fileInfoRepository.save({
			displayName: dto.fileDisplayName || fileInfo.originalname,
			description: dto.fileDescription,
			path: fileInfo.path,
			mimetype: fileInfo.mimetype,
			createdAt: Date.now(),
		});
	}

	async getListFiles(
		query: GetListFilesQuery,
	): Promise<[FileInfoEntity[], number]> {
		const cursor = query.cursor || Date.now();
		const files = await this.fileInfoRepository.find({
			where: {
				createdAt: LessThan(cursor),
			},
			take: query.limit,
			order: { createdAt: "DESC", displayName: "ASC" },
		});
		const nextCursor =
			files.length > 0 && files.length == query.limit
				? files[files.length - 1].createdAt
				: null;
		return [files, nextCursor];
	}

	async getFileInfo(id: number) {
		const fileInfo = await this.fileInfoRepository.findOne({
			where: { id: id },
		});
		if (!fileInfo) throw new NotFoundException("File not found!");
		return fileInfo;
	}

	async updateInfo(id: number, dto: EditFileInfoRequest) {
		const fileInfo = await this.getFileInfo(id);
		await this.fileInfoRepository.save({
			...fileInfo,
			displayName: dto.displayName || fileInfo.displayName,
			description: dto.description || fileInfo.description,
		});
	}

	async deleteFiles(dto: DeleteFilesRequest) {
		const fileInfoList = await this.fileInfoRepository.find({
			where: { id: In(dto.ids) },
		});
		const filePaths = fileInfoList.map((item) => item.path);
		for (const filePath of filePaths) {
			fs.unlink(filePath, (err) => {
				if (err) {
					console.log(err);
				}
			});
		}
		await this.fileInfoRepository.delete({
			id: In(dto.ids),
		});
	}
}
