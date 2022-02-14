import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class CreateOrderSyncingDto extends PartialType(CreateOrderDto) {
    serial: string
}
