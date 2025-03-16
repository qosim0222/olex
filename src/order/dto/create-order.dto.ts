import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({  example: "550e8400-e29b-41d4-a716-446655440000" })
    @IsNotEmpty({ message: "User ID bo'sh bo'lmasligi kerak" })
    userId: string;

    @ApiProperty({ example: "660e8400-e29b-41d4-a716-446655440000" })
    @IsNotEmpty({ message: "Elon ID bo'sh bo'lmasligi kerak" })
    elonId: string;
}
