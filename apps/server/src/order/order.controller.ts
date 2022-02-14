import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderSyncingDto } from './dto/create-order-syncing';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("create")
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post("createSyncing")
  createSyncing(@Body() createOrderSyncingDto: CreateOrderSyncingDto) {
    return this.orderService.createSyncing(createOrderSyncingDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }  
}
