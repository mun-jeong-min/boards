import {IsNotEmpty, IsString} from 'class-validator'

export class setDto {
    @IsString()
    @IsNotEmpty()
    title:string;
    
    @IsString()
    @IsNotEmpty()
    description:string;
}