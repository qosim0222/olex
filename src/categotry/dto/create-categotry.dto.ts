import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategotryDto {
    
    @IsNotEmpty({message: "name is required"})
    @IsString()
    @ApiProperty({example:"uy"})
    
    name: string
}
