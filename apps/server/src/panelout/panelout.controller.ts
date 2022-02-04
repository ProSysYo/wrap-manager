import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { PaneloutService } from './panelout.service';
import { CreatePaneloutDto } from './dto/create-panelout.dto';

@Controller('panelout')
export class PaneloutController {
  constructor(private readonly paneloutService: PaneloutService) {}

  @Post('create')
  create(@Body() createPaneloutDto: CreatePaneloutDto) {
    return this.paneloutService.create(createPaneloutDto);
  }
  
  @Patch("markDateShipment/:numberOrder")
  markDateShipment(@Param("numberOrder") numberOrder: string) {
    return this.paneloutService.markDateShipment(numberOrder);
  }

  @Post('packagePanels')
  packagePanels(@Body() numbers: string[]) {
    return this.paneloutService.packagePanels(numbers);
  }
}
