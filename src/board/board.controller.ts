import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entity/user.entity';
import { GetToken } from 'src/decorator/get-token';
import { GetUser } from 'src/decorator/get-user';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(AuthGuard())
  @Post('create')
  public async create(@Body() body, @GetUser() user: User): Promise<void> {
    await this.boardService.create(body, user);
  }

  @UseGuards(AuthGuard())
  @Get('readAll')
  public async ReadAll(): Promise<Board[]> {
    return await this.boardService.ReadAll();
  }

  @UseGuards(AuthGuard())
  @Get('read')
  public async Read(@GetUser() user: User): Promise<Board[]> {
    return await this.boardService.ReadMine(user);
  }

  @UseGuards(AuthGuard())
  @Delete('delete/:id')
  public async delete(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.delete(id, user);
  }

  @UseGuards(AuthGuard())
  @Patch('update/:id')
  public async update(
    @Param('id', ParseIntPipe) id,
    @Body() board:Board
  ): Promise<void> {
    return this.boardService.update(id,board)
  }

  @Get('token')
  getAuthToken(@GetToken() token: string) {
    return `HEADER애 입력한 토큰: ${token}`;
  }
}
