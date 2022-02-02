import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// import { User } from "./user/user.entity";
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/User.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { Door } from './door/entities/door.entity';
import { DoorModule } from './door/door.module';
import { PaneloutModule } from './panelout/panelout.module';
import { Panelout } from './panelout/entities/panelout.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "1234",
			database: "wrap",
			entities: [User, Order, Door, Panelout],
			synchronize: true,
		}),
		AuthModule,
		OrderModule,
		DoorModule,
		PaneloutModule,		
	],
})
export class AppModule {}