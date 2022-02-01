import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoorService } from './door.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { MarkDateDto } from './dto/mark-date.dto';
import { MarkDateWatehouseDto } from './dto/mark-date-warehouse.dto';

@Controller('door')
export class DoorController {
  constructor(private readonly doorService: DoorService) {}

  @Post()
  create(@Body() createDoorDto: CreateDoorDto) {
    return this.doorService.create(createDoorDto);
  }

  @Get()
  findAll() {
    return this.doorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoorDto: CreateDoorDto) {
    return this.doorService.update(+id, updateDoorDto);
  }

  @Post("markDate")
  markDate(@Body() markDateDto: MarkDateDto) {
    return this.doorService.markDate(markDateDto);
  }

  @Post("markDateWarehouse")
  markDateWarehouse(@Body() markDateWarehouseDto: MarkDateWatehouseDto) {
    return this.doorService.markDateWarehouse(markDateWarehouseDto);
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doorService.remove(+id);
  }
}
