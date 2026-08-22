import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id', CustomParseIntPipe) id: number) {
        return `Olá, usuário ${id}!`;
    }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.userService.create(dto);
    }
}
