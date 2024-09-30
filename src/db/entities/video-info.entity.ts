import { FileInfoEntity } from "./file-info.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class VideoInfoEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@ManyToOne(() => FileInfoEntity)
	@JoinColumn()
	fileInfo: FileInfoEntity;

	@Column()
	ffmpegInfoJson: string;

	@Column()
	createdAt: number;
}
