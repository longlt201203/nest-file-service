import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FileInfoEntity {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	displayName: string;

	@Column({ nullable: true })
	description?: string;

	@Column()
	path: string;

	@Column()
	mimetype: string;

	@Column()
	createdAt: number;
}
