import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDoorDto } from "./dto/create-door.dto";
import { Door } from "./entities/door.entity";
import { MarkDateDto } from './dto/mark-date.dto';
import { MarkDateWatehouseDto } from './dto/mark-date-warehouse.dto';
import { normalizeSerial } from "apps/util/normalizeSerial";

@Injectable()
export class DoorService {
    constructor(
        @InjectRepository(Door)
        private doorRepository: Repository<Door>
    ) {}

    create(createDoorDto: CreateDoorDto) {
        return "This action adds a new door";
    }

    async findAll() {
        const doors = await this.doorRepository.find({
            relations: ["order"],
            order: {
                serial: "ASC",
            },
        });
        return doors;
    }

    findOne(id: number) {
        return `This action returns a #${id} door`;
    }

    update(id: number, updateDoorDto: CreateDoorDto) {
        return `This action updates a #${id} door`;
    }

    remove(id: number) {
        return `This action removes a #${id} door`;
    }

    async getMaxSerial(character: string) {
        return await this.doorRepository
            .createQueryBuilder("door")
            .select("MAX(door.numberSerial)", "numberSerial")
            .where("door.characterSerial = :characterSerial", {
                characterSerial: character,
            })
            .getRawOne();
    }

    async generateNewDoor(dto: CreateDoorDto) {
        return await this.doorRepository.create({ ...dto, isActive: true });
    }

    async findDoorBySerial(serial: string) {
        return await this.doorRepository.findOne({
            where: { serial: serial },
        });
    }
  
    //Штриховка
    async markDate(dto: MarkDateDto) {        
        const serial = normalizeSerial(dto.serial)        
        
        const door = await this.findDoorBySerial(serial);

        if (!door) throw new HttpException(`Дверь с таким номером не существует!`, HttpStatus.NOT_FOUND);

        await this.doorRepository.update(door.id, {
            [dto.field]: new Date(),
        });

        return true;
    }

    async markDateWarehouse(dto: MarkDateWatehouseDto) {
        const serial = normalizeSerial(dto.serial)
        const door = await this.findDoorBySerial(serial);

        if (!door) throw new HttpException(`Дверь с таким номером не существует!`, HttpStatus.NOT_FOUND);

        await this.doorRepository.update(door.id, {
            dateOtdelochnik: new Date(),
            fioOtdelochnik: dto.codeOtdelochnik
        });

        return true;
    }   
}
