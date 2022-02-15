import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DoorService } from './door.service';
import { MarkDateDto } from './dto/mark-date.dto';
import { MarkDateWatehouseDto } from './dto/mark-date-warehouse.dto';
import { WithDatesDto } from './dto/withDatesDto';

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

  @Patch("markPrintLabel/:serial")
  markPrintLabel(@Param("serial") serial: string) { 
    return this.doorService.markPrintLabel(serial);
  }
  
  @Get("getSingleDoorsForPrintLabel")
  getSingleDoorsForPrintLabel() {
    return this.doorService.getSingleDoorsForPrintLabel();
  }

  @Post('updateDatesSyncing')
  updateDatesSyncing( @Body() dto: WithDatesDto) {
    return this.doorService.updateDatesSyncing(dto);
  } 
}
