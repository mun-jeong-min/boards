import { Exclude } from "class-transformer";
import { type } from "os";
import { Board } from "src/board/entity/board.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid:number;

    @Column()
    id:string;

    @Column({unique: true})
    username:string;

    @Column()
    password:string;

    @OneToMany(type => Board, board => board.user, {eager:true})
    boards:Board[];
}