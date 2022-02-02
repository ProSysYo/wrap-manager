import { Module } from '@nestjs/common';
import { PaneloutService } from './panelout.service';
import { PaneloutController } from './panelout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panelout } from './entities/panelout.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Panelout])],
  controllers: [PaneloutController],
  providers: [PaneloutService]
})
export class PaneloutModule {}
