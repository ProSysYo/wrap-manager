import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IOrder } from "../../../../common/IOrder";
import { Door } from "../../door/entities/door.entity";

@Entity()
export class Order implements IOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    price: string;

    @Column({ nullable: false })
    codeCustomer: string;

    @Column({ nullable: false })
    numberCustomer: string;

    @Column({ nullable: false })
    nameCustomer: string;

    @Column({ nullable: false })
    party: string;

    @Column({ type: "date", nullable: false })
    datePlaneShipment: Date;

    @Column({ nullable: false })
    manager: string;

    @Column({ nullable: false })
    modelPolotno: string;

    @Column({ nullable: false })
    modelCorob: string;

    @Column({ nullable: false })
    height: number;

    @Column({ nullable: false })
    width: number;

    @Column({ nullable: false })
    hinge: string;

    @Column({ nullable: false })
    baseLock: string;

    @Column({ nullable: false })
    padBaseLock: string;

    @Column({ nullable: false })
    handle: string;

    @Column()
    cylinderBaseLock: string;

    @Column({ nullable: false })
    optionalLock: string;

    @Column({ nullable: false })
    padOptionalLock: string;

    @Column({ nullable: false })
    cylinderOptionalLock: string;

    @Column({ nullable: false })
    bolt: string;

    @Column({ nullable: false })
    eye: string;

    @Column({ nullable: false })
    colorDoor: string;

    @Column({ nullable: false })
    typeDecorationOutside: string;

    @Column({ nullable: false })
    colorDecorationOutside: string;

    @Column({ nullable: false })
    patinaDecorationOutside: string;

    @Column({ nullable: false })
    decorationOutside: string;

    @Column({ nullable: false })
    typeDecorationInside: string;

    @Column({ nullable: false })
    colorDecorationInside: string;

    @Column({ nullable: false })
    patinaDecorationInside: string;

    @Column({ nullable: false })
    decorationInside: string;

    @Column({ nullable: false })
    window: string;

    @Column({ nullable: true })
    heightWindow: string;

    @Column({ nullable: true })
    widthWindow: string;

    @Column({ nullable: true })
    thickWindow: string;

    @Column({ nullable: false })
    colorWindow: string;

    @Column({ nullable: false })
    colorKovkaWindow: string;

    @Column({ nullable: false })
    patinaKovkaWindow: string;

    @Column({ nullable: false })
    seal: string;

    @Column({ nullable: false })
    ear: string;

    @Column({ nullable: false })
    closer: string;

    @Column({ nullable: false })
    forceCloser: string;

    @Column({ nullable: false })
    holeBox: string;

    @Column({ nullable: false })
    typeHinge: string;

    @Column({ nullable: false })
    trioHinge: string;

    @Column({ nullable: false })
    steelDoorStep: string;

    @Column({ nullable: false })
    backSheet: string;

    @Column({ nullable: false })
    frame: string;

    @Column({ nullable: false })
    twoDoor: string;

    @Column({ nullable: false })
    package: string;

    @Column({ nullable: true })
    note: string;

    @Column({ type: "date", nullable: false })
    dateCreate: Date;

    @Column({ type: "date", nullable: true })
    dateUpdate: Date;

    @Column({ nullable: false })
    widthTwoDoor: string;

    @Column({ nullable: false })
    metalBox: string;

    @Column({ nullable: false })
    metalPolotno: string;

    @Column({ nullable: false })
    countDoors: number;

    @Column({ nullable: false })
    thickPolotno: string;

    @Column({ nullable: false })
    thermoCable: string;

    @Column({ nullable: false })
    passport: string;

    @Column({ nullable: false })
    eccentric: string;

    @Column({ nullable: false })
    electromagnet: string;

    @Column({ nullable: false })
    illumination: string;

    @Column({ nullable: false })
    leftPolka: string;

    @Column({ nullable: false })
    rightPolka: string;

    @Column({ nullable: false })
    framuga: string;

    @Column({ nullable: false })
    soundInsulation: string;

    @Column({ nullable: false })
    colorFrame: string;

    @OneToMany(() => Door, (door) => door.order)
    doors: Door[];

    @Column({ nullable: false, default: true })
    isActive: boolean;
}
