import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Extra {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    numberOrder: number;

    @Column()
    codeCustomer: string;

    @Column()
    nameCustomer: string;

    @Column()
    manager: string;

    @Column()
    placeShipment: string;

    @Column()
    payment: string;

    @Column()
    numberAccount: string;

    @Column()
    price: number;

    @Column()
    name: string;

    @Column()
    count: number;

    @Column({ type: "date" })
    dateCreate: Date;

    @Column({ type: "date" })
    datePlane: Date;

    @Column({ type: "date", nullable: true })
    dateGive: Date; 

    @Column({ type: "date", nullable: true })
    dateShipment: Date;

    @Column()
    isActive: boolean;
}
