import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CreateDoorDto } from "./dto/create-door.dto";
import { Door } from "./entities/door.entity";
import { MarkDateDto } from "./dto/mark-date.dto";
import { MarkDateWatehouseDto } from "./dto/mark-date-warehouse.dto";
import { normalizeSerial } from "apps/util/normalizeSerial";

@Injectable()
export class DoorService {
    constructor(
        @InjectRepository(Door)
        private doorRepository: Repository<Door>
    ) {}

    async findAll() {
        const doors = await this.doorRepository.find({
            relations: ["order"],
            order: { serial: "ASC" },
        });
        return doors;
    }

    async getMaxSerial(character: string) {
        return await this.doorRepository
            .createQueryBuilder("door")
            .select("MAX(door.numberSerial)", "numberSerial")
            .where("door.characterSerial = :characterSerial", { characterSerial: character })
            .getRawOne();
    }

    async generateNewDoor(dto: CreateDoorDto) {
        return await this.doorRepository.create({ ...dto, isActive: true });
    }

    private async findDoorBySerial(serial: string) {
        return await this.doorRepository.findOne({ where: { serial: serial } });
    }

    async getSingleDoorsForPrintLabel() {
        // const doors = await this.doorRepository.find({
        //     relations: ["order"],
        //     order: { serial: "ASC" },
        //     where: { printLabel: null, order: { party: "Заказная"} }
        // });

        const doors = await this.doorRepository
            .createQueryBuilder("door")            
            .leftJoinAndSelect("door.order", "order")            
            .where("door.printLabel IS NULL")
            .andWhere('order.party = :party', {party: "Заказная"})
            .orderBy('serial', 'ASC')
            .getMany();
        return doors;
    }

    //Штриховка
    async markDate(dto: MarkDateDto) {
        const serial = normalizeSerial(dto.serial);
        try {
            const door = await this.findDoorBySerial(serial);

            if (!door) throw new HttpException(`Дверь с таким номером не существует!`, HttpStatus.NOT_FOUND);

            await this.doorRepository.update(door.id, { [dto.field]: new Date() });

            return true;
        } catch (e) {
            console.log("error", e);

            if (e instanceof HttpException) throw e;

            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: "Произошло не предвиденное исключение" },
                HttpStatus.FORBIDDEN
            );
        }
    }

    async markDateWarehouse(dto: MarkDateWatehouseDto) {
        try {
            const serial = normalizeSerial(dto.serial);
            const door = await this.findDoorBySerial(serial);
            if (!door) throw new HttpException(`Дверь с таким номером не существует!`, HttpStatus.NOT_FOUND);

            await this.doorRepository.update(door.id, {
                dateOtdelochnik: new Date(),
                fioOtdelochnik: dto.codeOtdelochnik,
            });

            return true;
        } catch (e) {
            console.log("error", e);
            if (e instanceof HttpException) throw e;

            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: "Произошло не предвиденное исключение" },
                HttpStatus.FORBIDDEN
            );
        }
    }

    async markPrintLabel(serial: string) {
        try { 
            const door = await this.findDoorBySerial(serial);
            if (!door) throw new HttpException(`Дверь с таким номером не существует!`, HttpStatus.NOT_FOUND);            
            
            await this.doorRepository.update(door.id, { printLabel: "++" });

            return true
        } catch (e) {
            console.log("error", e);
            if (e instanceof HttpException) throw e;

            throw new HttpException(
                { status: HttpStatus.FORBIDDEN, error: "Произошло не предвиденное исключение" },
                HttpStatus.FORBIDDEN
            );
        }
    } 
}
