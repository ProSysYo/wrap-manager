import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true, nullable: false })
	login: string;

	@Column({ unique: true, nullable: false })
	name: string;

	@Column()
	password: string;

	@Column()
	role: string;

	@Column()
	isActive: boolean;
}