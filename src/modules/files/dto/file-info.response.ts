import { FileInfoEntity } from "@db/entities";
import { ApiProperty } from "@nestjs/swagger";

export class FileInfoResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	displayName: string;

	@ApiProperty({ required: false })
	description?: string;

	@ApiProperty()
	mimetype: string;

	@ApiProperty()
	createdAt: number;

	static fromEntity(entity: FileInfoEntity): FileInfoResponse {
		return {
			id: entity.id,
			displayName: entity.displayName,
			description: entity.description,
			createdAt: entity.createdAt,
			mimetype: entity.mimetype,
		};
	}

	static fromEntities(entities: FileInfoEntity[]) {
		return entities.map(this.fromEntity);
	}
}
