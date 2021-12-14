import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class signupDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id:string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username:string;

    @ApiProperty()
    @IsString() 
    @IsNotEmpty()
    password:string;
}