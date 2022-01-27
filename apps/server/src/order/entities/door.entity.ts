import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './order.entity';

@Entity()
export class Door {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	serial: string;

	@Column()
	characterSerial: string;

	@Column()
	numberSerial: number;

	@ManyToOne(() => Order, order => order.doors)
	order: Order;

	@Column()
	isActive: boolean;
}