import { Module } from '@nestjs/common';
import { DoorService } from './door.service';
import { DoorController } from './door.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Door } from './entities/door.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Door])],
  controllers: [DoorController],
  providers: [DoorService],
  exports: [DoorService]
})
export class DoorModule {}
