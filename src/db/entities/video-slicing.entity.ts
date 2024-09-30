import { VideoInfoEntity } from "@db/entities/video-info.entity";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class VideoSlicingEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	status: number;

	@Column()
	settings: string;

	@Column()
	createdAt: number;

	@Column()
	updatedAt: number;

	@ManyToOne(() => VideoInfoEntity, { onDelete: "CASCADE" })
	@JoinColumn()
	videoInfo: VideoInfoEntity;
}
