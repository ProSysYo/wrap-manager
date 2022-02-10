import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExtraDto } from "./dto/create-extra.dto";
import { Extra } from "./entities/extra.entity";

@Injectable()
export class ExtraService {
    constructor(
        @InjectRepository(Extra)
        private extraRepository: Repository<Extra>
    ) {}

    async create(createExtraDto: CreateExtraDto) {
        let res = await this.getMaxNumber();
        const maxNumber = res + 1;
        console.log(maxNumber);
        
        const extra = await this.extraRepository.create({
            ...createExtraDto,
            numberOrder: maxNumber,
            dateCreate: new Date(),
            isActive: true,
        });
        const result = await this.extraRepository.save(extra);
        return result;
    }

    private async getMaxNumber() {
        const result = await this.extraRepository
            .createQueryBuilder("extra")
            .select("MAX(extra.numberOrder)", "numberOrder")
            .getRawOne();        
        
        let maxNumber: number = result.numberOrder;

        if (!maxNumber) maxNumber = 0;        
        
        return maxNumber;
    }    
}
