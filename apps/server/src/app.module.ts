import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// import { User } from "./user/user.entity";
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/User.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "postgres",
			password: "1234",
			database: "wrap",
			entities: [User],
			synchronize: true,
		}),
		AuthModule,		
	],
})
export class AppModule {}