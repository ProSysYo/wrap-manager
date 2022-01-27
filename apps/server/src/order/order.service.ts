import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";
import { Door } from "./entities/door.entity";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private userRepository: Repository<Order>,
        @InjectRepository(Door)
        private doorRepository: Repository<Door>,
        private connection: Connection
    ) {}

    async create(dto: CreateOrderDto) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            //Получить максимальную серию за текущий месяц
            const character: string = "Л";

            const result = await this.doorRepository
                .createQueryBuilder("door")
                .select("MAX(door.numberSerial)", "numberSerial")
                .where("door.characterSerial = :characterSerial", {
                    characterSerial: character,
                })
                .getRawOne();

            let lastNumber = result.numberSerial;
            if (!lastNumber) {
                lastNumber = 0;
            }
                        
            //Сохранить заказ
            const newOrder = await this.userRepository.create({
                ...dto,
                isActive: true,
            });
            await queryRunner.manager.save(newOrder);

            //в цикле по количеству дверей в заказе, сохранить каждую дверь
            let i: number;
            for (i = 1; i <= 2; i++) {
                lastNumber++;
                const strNumber = lastNumber.toString().padStart(4, "0");

                const serial = character + strNumber;
                const newDoor = await this.doorRepository.create({
                    serial,
                    characterSerial: character,
                    numberSerial: lastNumber,
                    order: newOrder,
                    isActive: true,
                });
                await queryRunner.manager.save(newDoor);
            }

            await queryRunner.commitTransaction();
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
        const orders = await this.userRepository.find();
        return orders;
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}
