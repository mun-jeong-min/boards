import { IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}