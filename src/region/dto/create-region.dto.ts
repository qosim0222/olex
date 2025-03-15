import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({ example: "Andijon" })
    @IsNotEmpty({message: "name majburiy"})
    @IsString()
    name:string
}
