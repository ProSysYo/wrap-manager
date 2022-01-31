import { Controller, Post, Body, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

	@Get("/auth")
    auth(@Req() request: Request) {
		const token = request.headers.authorization;
        return this.authService.auth(token);
    }
}
