import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsMongoId, IsOptional, IsString, IsNotEmpty } from "class-validator";

enum Usertype {
    client = 'CLIENT',
    seller = 'SELLER'
}

export class CreateUserDto {
    @ApiProperty({ example: "John Doe", description: "Foydalanuvchining to‘liq ismi" })
    @IsString()
    @IsNotEmpty({ message: "Full name is required" })  
    fullname: string;

    @ApiProperty({ example: "johndoe@example.com", description: "Foydalanuvchi email manzili" })
    @IsEmail({}, { message: "Invalid email format" }) 
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @ApiProperty({ example: "+998901234567", description: "Foydalanuvchi telefon raqami" })
    @IsString()
    @IsNotEmpty({ message: "Phone number is required" })
    phone: string;

    @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    password: string;

    @ApiProperty({ example: "65df8b39f1a2c40012345678", description: "Region ID (MongoDB ObjectId formatida)" })
    @IsMongoId({ message: "Invalid region ID format" }) 
    @IsNotEmpty({ message: "Region ID is required" })
    region: string;

    @ApiPropertyOptional({ example: "Tashkent, Uzbekistan", description: "Foydalanuvchi joylashuvi (majburiy emas)" })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({ example: "Best Shop", description: "Do‘kon nomi (faqat sotuvchilar uchun, majburiy emas)" })
    @IsOptional()
    @IsString()
    shopname?: string;

    @ApiProperty({ example: "https://example.com/image.jpg", description: "Foydalanuvchi rasmi URL manzili" })
    @IsString()
    @IsNotEmpty({ message: "Image URL is required" })
    image: string;

    @ApiProperty({ example: "CLIENT", description: "Foydalanuvchi turi: CLIENT yoki SELLER", enum: Usertype })
    @IsEnum(Usertype, { message: "User type must be CLIENT or SELLER" }) 
    @IsNotEmpty({ message: "User type is required" })
    type: Usertype;
}

export class loginUserDto {
    @ApiProperty({ example: "johndoe@example.com", description: "Foydalanuvchi email manzili" })
    @IsEmail({}, { message: "Invalid email format" })
    @IsNotEmpty({ message: "Email is required" })
    email: string;

    @ApiProperty({ example: "password123", description: "Foydalanuvchi paroli" })
    @IsString()
    @IsNotEmpty({ message: "Password is required" })
    password: string;
}
