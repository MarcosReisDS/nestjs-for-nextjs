import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-reponse.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(
        @Req() req: AuthenticatedRequest,
        @Param('id', CustomParseIntPipe) id: number
    ) {
        console.log(req.user);
        return `Olá, usuário ${id}!`;
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        const user = await this.userService.create(dto);
        return new UserResponseDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async update(
        @Req() req: AuthenticatedRequest,
        @Body() dto: UpdateUserDto
    ) {
        const user = await this.userService.update(req.user.id, dto);
        return new UserResponseDto(user)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me/password')
    async updatePassword(
        @Req() req: AuthenticatedRequest,
        @Body() dto: UpdatePasswordDto
    ) {
        console.log(dto)
        const user = await this.userService.updatePassword(req.user.id, dto);
        return new UserResponseDto(user)
    }
}
