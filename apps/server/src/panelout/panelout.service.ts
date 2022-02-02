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
            if (!maxNumber) {
                maxNumber = 0;
            }
            maxNumber++;

            let el: number = 1
            for (const panel of dto.panels) {
                let newOrder = await this.paneloutRepository.create({
                    ...panel,
                    numberOrder: maxNumber + "-" + el,
                    number: maxNumber,
                    dateCreate: new Date(),
                    isActive: true,
                });
                
                el++
                await queryRunner.manager.save(newOrder);
            }           
            

            await queryRunner.commitTransaction();

            return true;
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

    findAll() {
        return `This action returns all panelout`;
    }

    findOne(id: number) {
        return `This action returns a #${id} panelout`;
    }

    remove(id: number) {
        return `This action removes a #${id} panelout`;
    }

    async getMaxNumber() {
        return await this.paneloutRepository
            .createQueryBuilder("panelout")
            .select("MAX(panelout.number)", "number")
            .getRawOne();
    }
}
