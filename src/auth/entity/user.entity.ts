import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Board } from "src/board/entity/board.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    uid:number;

    @ApiProperty()
    @Column()
    id:string;

    @ApiProperty()
    @Column({unique: true})
    username:string;

    @ApiProperty()
    @Column()
    password:string;

    @ApiProperty()
    @OneToMany(type => Board, board => board.user, {eager:true})
    boards:Board[];
}