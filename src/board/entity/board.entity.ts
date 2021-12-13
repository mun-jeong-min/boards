import { type } from "os";
import { User } from "src/auth/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    description:string;

    @ManyToOne(type => User, user=>user.boards, {eager: false})
    user:User;
}