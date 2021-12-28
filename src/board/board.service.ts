import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { setDto } from './dto/set.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
  ) {}

  public async create(
    { title, description }: setDto,
    user: User,
  ): Promise<void> {
    await this.boardRepository.save({
      title: title,
      description: description,
      user,
    });
  }
  public async ReadAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  public async ReadMine(user: User): Promise<Board[]> {
    return this.boardRepository
      .createQueryBuilder('board')
      .where('board.userUid = :userUid', { userUid: user.uid })
      .getMany();
  }

  public async delete(id: number, user: User): Promise<void> {
    await this.boardRepository.delete({id,user});
  }

  public async update(id: number, board:Board):Promise<void> {
    await this.boardRepository.update(id,board)
  }
}
