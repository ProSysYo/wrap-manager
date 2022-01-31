import { Order } from "../../order/entities/order.entity";

export class CreateDoorDto {
    serial: string;
    characterSerial: string;
    numberSerial: number;
    ordinalNumber: string;
    order: Order;
}
