import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { getMonth, getYear } from "date-fns";
import { findMonthCharacter } from "../common/find-month-character";
import { DoorService } from "../door/door.service";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private doorService: DoorService,
        private connection: Connection
    ) {}

    async create(dto: CreateOrderDto) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const month = getMonth(new Date()) + 1;
            const year = getYear(new Date());

            const character = findMonthCharacter(year, month);

            const result = await this.doorService.getMaxSerial(character);

            let lastNumber = result.numberSerial;
            if (!lastNumber) {
                lastNumber = 0;
            }

            //Сохранить заказ
            const countDoors = +dto.countDoors.split("/")[1];
            const newOrder = await this.orderRepository.create({
                ...dto,
                countDoors,
                dateCreate: new Date(),
                isActive: true,
            });
            await queryRunner.manager.save(newOrder);

            //в цикле по количеству дверей в заказе, сохранить каждую дверь
            let i: number;
            let firstDoor: string;
            let lastDoor: string;
            for (i = 1; i <= countDoors; i++) {
                lastNumber++;
                const strNumber = lastNumber.toString().padStart(4, "0");

                const serial = character + strNumber;

                if (i === 1) firstDoor = serial;
                if (i === countDoors) lastDoor = serial;

                const newDoor = await this.doorService.generateNewDoor({
                    serial,
                    characterSerial: character,
                    numberSerial: lastNumber,
                    ordinalNumber: i + "/" + countDoors,
                    order: newOrder,
                });
                await queryRunner.manager.save(newDoor);
            }

            await queryRunner.commitTransaction();

            return firstDoor + "-" + lastDoor;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            console.log("error", e);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: "Произошло не предвиденное исключение",
                },
                HttpStatus.FORBIDDEN
            );
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() {
        const orders = await this.orderRepository.find({
            relations: ["doors"]            
        });
        return orders;
    }  

    async update(id: number, dto: UpdateOrderDto) {        
        const order = await this.orderRepository.findOne(id);

        if (!order) {
            throw new HttpException(`Заказ не найден`, HttpStatus.NOT_FOUND);
        }

        const countDoors = +dto.countDoors.split("/")[1];

        if (countDoors !== order.countDoors) {
            throw new HttpException(
                {
                    status: HttpStatus.CONFLICT,
                    error: "Нельзя изменять количество дверей в заказе",
                },
                HttpStatus.CONFLICT
            );
        }
        await this.orderRepository.update(id, { ...dto, countDoors, dateUpdate: new Date() });
        return await this.orderRepository.findOne(id);
    }    
}
