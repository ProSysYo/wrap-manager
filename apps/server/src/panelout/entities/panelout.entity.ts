import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Panelout {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})    
    numberOrder: string;

    @Column()
    number: number

    @Column()
    codeCustomer: string;

    @Column()
    nameCustomer: string;

    @Column()
    manager: string;

    @Column()
    numberAccount: string;

    @Column()
    name: string;

    @Column()
    thick: string;

    @Column()
    size: string;

    @Column()
    milling: string;

    @Column()
    wrap: string;

    @Column()
    patina: string;

    @Column()
    handle: string;

    @Column()
    hinge: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @Column()
    numberCustomer: string;    

    @Column({ type: "date" })
    datePlane: Date;

    @Column({ type: "date" })
    dateCreate: Date;

    @Column({ type: "date", nullable: true })
    dateGive: Date;

    @Column({ type: "date", nullable: true })
    dateCompleted: Date;

    @Column({ type: "date", nullable: true })
    dateShipment: Date;

    @Column({nullable: true})
    numberLabel: string;

    @Column()
    description: string;

    @Column()
    printOrder: boolean;

    @Column()
    isActive: boolean;
}
