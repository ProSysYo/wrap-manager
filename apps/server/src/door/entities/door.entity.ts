import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from '../../order/entities/order.entity';

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

	@Column()
	ordinalNumber: string;

	@Column({ type: "date", nullable: true })
	dateGiveMetall: Date;

	@Column({ type: "date", nullable: true })
	dateGivePanel: Date;

	@Column({ type: "date", nullable: true })
	dateMadeDirty: Date;

	@Column({ type: "date", nullable: true })
	dateMadePaint: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel: Date;

	@Column({ type: "date", nullable: true })
	dateMadeClear: Date;

	@Column({ type: "date", nullable: true })
	datePackaging: Date;	

	@Column({ type: "date", nullable: true })
	dateShipment: Date;

	@Column({ type: "date", nullable: true })
	dateOtdelochnik: Date;

	@Column({ nullable: true })
	fioOtdelochnik: string;

	@Column({ nullable: true })
	printLabel: string;
	
	@ManyToOne(() => Order, order => order.doors)
	order: Order;

	@Column()
	isActive: boolean;
}