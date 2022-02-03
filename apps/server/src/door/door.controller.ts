import { Controller, Get, Post, Body } from '@nestjs/common';
import { DoorService } from './door.service';
import { MarkDateDto } from './dto/mark-date.dto';
import { MarkDateWatehouseDto } from './dto/mark-date-warehouse.dto';

@Controller('door')
export class DoorController {
  constructor(private readonly doorService: DoorService) {}
 
  @Get()
  findAll() {
    return this.doorService.findAll();
  }

  @Post("markDate")
  markDate(@Body() markDateDto: MarkDateDto) {
    return this.doorService.markDate(markDateDto);
  }

  @Post("markDateWarehouse")
  markDateWarehouse(@Body() markDateWarehouseDto: MarkDateWatehouseDto) {
    return this.doorService.markDateWarehouse(markDateWarehouseDto);
  }   
}
