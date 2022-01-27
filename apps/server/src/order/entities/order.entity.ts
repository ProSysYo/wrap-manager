import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IOrder } from '../../../../common/IOrder';
import { Door } from './door.entity';

@Entity()
export class Order implements IOrder {
    @PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	price: string;	

	@Column()
	codeCustomer: string;

	@Column()
	numberCustomer: string;

    @Column()
	nameCustomer: string;

    @Column()
	party: string;

    @Column({ type: "date", nullable: false })
	datePlaneShipment: Date;
    
    @Column()
	manager: string;

    @Column()
	modelPolotno: string;

    @Column()
	modelCorob: string;

    @Column()
	height: number;

    @Column()
	width: number;

    @Column()
	hinge: string;

    @Column()
	baseLock: string;

    @Column()
	padBaseLock: string;

    @Column()
	handle: string;

    @Column()
	cylinderBaseLock: string;

    @Column()
	optionalLock: string;

    @Column()
	padOptionalLock: string;

    @Column()
	cylinderOptionalLock: string;

    @Column()
	bolt: string;

    @Column()
	eye: string;

    @Column()
	colorDoor: string;

    @Column()
	typeDecorationOutside: string;

    @Column()
	colorDecorationOutside: string;

    @Column()
	patinaDecorationOutside: string;

    @Column()
	decorationOutside: string;

    @Column()
	typeDecorationInside: string;

    @Column()
	colorDecorationInside: string;

    @Column()
	patinaDecorationInside: string;

    @Column()
	decorationInside: string;

    @Column()
	window: string;

    @Column()
	heightWindow: string;

    @Column()
	widthWindow: string;

    @Column()
	thickWindow: string;

    @Column()
	colorWindow: string;

    @Column()
	colorKovkaWindow: string;

    @Column()
	patinaKovkaWindow: string;

    @Column()
	seal: string;

    @Column()
	ear: string;

    @Column()
	closer: string;

    @Column()
	forceCloser: string;

    @Column()
	holeBox: string;

    @Column()
	typeHinge: string;

    @Column()
	trioHinge: string;

    @Column()
	steelDoorStep: string;   

    @Column()
	backSheet: string;

    @Column()
	frame: string;

    @Column()
	twoDoor: string;

    @Column()
	package: string;

    @Column()
	note: string;

    @Column()
	widthTwoDoor: string;

    @Column()
	metalBox: string;

    @Column()
	metalPolotno: string;

    @Column()
	countDoors: string;

    @Column()
	thickPolotno: string;

    @Column()
	thermoCable: string;

    @Column()
	passport: string;

    @Column()
	eccentric: string;

    @Column()
	electromagnet: string;

    @Column()
	illumination: string;

    @Column()
	leftPolka: string;

    @Column()
	rightPolka: string;

    @Column()
	framuga: string;

    @Column()
	soundInsulation: string;

    @Column()
	colorFrame: string;
	
	@OneToMany(() => Door, door => door.order)
	doors: Door[];

	@Column()
	isActive: boolean;
}