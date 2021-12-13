import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { setDto } from './dto/set.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository:Repository<Board>
  ) {}

  public async create({title,description}: setDto, user: User):Promise<void>{
      await this.boardRepository.save({
          title: title,
          description: description,
          user
      })
  }

  public async ReadMine(
    user:User,
  ):Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userUid = :userUid', {userUid: user.uid});

    const boards = await query.getMany();
    
    return boards;
  }

  public async delete(id:number, user:User):Promise<void> {
    const result = await this.boardRepository.delete({id,user});

    if(result.affected === 0) {
      throw new NotFoundException('cannot find')
    }
  }
}