import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaneloutService } from './panelout.service';
import { CreatePaneloutDto } from './dto/create-panelout.dto';

@Controller('panelout')
export class PaneloutController {
  constructor(private readonly paneloutService: PaneloutService) {}

  @Post('create')
  create(@Body() createPaneloutDto: CreatePaneloutDto) {
    return this.paneloutService.create(createPaneloutDto);
  }

  @Get()
  findAll() {
    return this.paneloutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paneloutService.findOne(+id);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paneloutService.remove(+id);
  }
}
