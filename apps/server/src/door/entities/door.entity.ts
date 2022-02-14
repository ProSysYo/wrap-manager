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

	// -------Модуль панелей
	// Поля выполненных панелей стандарт, стандартный случай
	@Column({ type: "date", nullable: true })
	dateMadePanel_1: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_2: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_3: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_4: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_5: Date;

	// Поля выполненных панелей, не стандартный случай
	@Column({ type: "date", nullable: true })
	dateMadePanel_11: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_12: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_13: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_14: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_15: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_16: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_17: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_18: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_19: Date;

	@Column({ type: "date", nullable: true })
	dateMadePanel_20: Date;	

	@Column({ type: "date", nullable: true })
	dateMadePanel: Date;

	// Поля перевезенных панелей стандарт, стандартный случай
	@Column({ type: "date", nullable: true })
	dateTransportedPanel_1: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_2: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_3: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_4: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_5: Date;

	// Поля перевезенных панелей, не стандартный случай
	@Column({ type: "date", nullable: true })
	dateTransportedPanel_11: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_12: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_13: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_14: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_15: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_16: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_17: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_18: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_19: Date;

	@Column({ type: "date", nullable: true })
	dateTransportedPanel_20: Date;	

	@Column({ type: "date", nullable: true })
	dateTransportedPanel: Date;

}