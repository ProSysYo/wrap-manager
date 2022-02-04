import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreatePaneloutDto } from "./dto/create-panelout.dto";
import { Panelout } from "./entities/panelout.entity";

@Injectable()
export class PaneloutService {
    constructor(
        @InjectRepository(Panelout)
        private paneloutRepository: Repository<Panelout>,
        private connection: Connection
    ) {}
    async create(dto: CreatePaneloutDto) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await this.getMaxNumber();
            let maxNumber: number = result.number;
            if (!maxNumber) maxNumber = 0;
            maxNumber++;

            let numbers: string[] = [];
            let offset: number = 0;
            for (let i: number = 1; i <= dto.count; i++) {
                if (i > 1 && dto.countSelected > 1) maxNumber++;
                dto.count > 1 && dto.countSelected == 1 ? (offset = i) : (offset = 1);

                for (let j = 0; j < dto.panels.length; j++) {
                    const currentNumber = maxNumber + "-" + (j + offset);
                    numbers.push(currentNumber);
                    let newOrder = await this.paneloutRepository.create({
                        ...dto.panels[j],
                        numberOrder: currentNumber,
                        number: maxNumber,
                        dateCreate: new Date(),
                        printOrder: false,
                        isActive: true,
                    });
                    await queryRunner.manager.save(newOrder);
                }
            }

            await queryRunner.commitTransaction();

            return numbers;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            console.log("error", e);
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    message: "Произошло не предвиденное исключение",
                },
                HttpStatus.FORBIDDEN
            );
        } finally {
            await queryRunner.release();
        }
    }

    async getMaxNumber() {
        return await this.paneloutRepository
            .createQueryBuilder("panelout")
            .select("MAX(panelout.number)", "number")
            .getRawOne();
    }

    /**
     * Эндпоинт для отметки даты отгрузки панелей. PS ради автономности, часть записей занесется, а часть нет
     * @returns сообщение об успехе или ошибку с номером панели
     * @param numberOrder -строка с номерами панелей, н-р: 8552-1#8552-6
     */
    async markDateShipment(numberOrders: string) {       
        const numbers = numberOrders.match(/\d+-\d+/g);

        if (!numbers) {
            throw new HttpException(
                { status: HttpStatus.NOT_FOUND, message: "Не корректный номер панелей: " + numberOrders },
                HttpStatus.NOT_FOUND
            );
        }

        try {
            for (const number of numbers) {
                const panel = await this.findPanelByNumberOrder(number);

                await this.paneloutRepository.update(panel.id, {
                    dateShipment: new Date(),
                });
            }

            return { status: HttpStatus.OK, message: "Дата добавлена" };
        } catch (e) {
            console.log("error", e);
            if (e instanceof HttpException) throw e;

            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, message: "Произошло не предвиденное исключение" },
                HttpStatus.FORBIDDEN
            );
        }
    }

    /**
     * @param numbers -массив с номерами панелей, ["111-1", 1112-12]
     * @returns object { numberLabel: 123, panels: [{number: 111-1, numberCustomer: "сч.1233, wrap: "венге кантри"}]}
     */
    async packagePanels(numbers: string[]) {
        console.log(numbers);
        if (numbers.length === 0) {
            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, message: "Нет номеров панелей" },
                HttpStatus.FORBIDDEN
            );
        }

        for(const number of numbers) {
            const test = number.match(/\d+-\d+/)
            if (!test) {
                throw new HttpException(
                    { status: HttpStatus.FORBIDDEN, message: "Не валидный номер " + number },
                    HttpStatus.FORBIDDEN
                );
            }
        }

        try {
        } catch (e) {
            console.log("error", e);
            if (e instanceof HttpException) throw e;

            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, message: "Произошло не предвиденное исключение" },
                HttpStatus.FORBIDDEN
            );
        }
    }

    /**
     * Метод для поиска панели по номеру
     * @returns panelout или сгенерирует ошибку, что нет такой записи
     * @param numberOrder - номер панели
     * @example const panel = findPanelByNumberOrder("45-1")
     */
    private async findPanelByNumberOrder(numberOrder: string) {
        const order = await this.paneloutRepository.findOne({
            where: { numberOrder: numberOrder },
        });

        if (order) return order;

        throw new HttpException(
            { status: HttpStatus.NOT_FOUND, message: "Панель с таким номером не найдена: " + numberOrder },
            HttpStatus.NOT_FOUND
        );
    }
}
