import { IsString, IsNotEmpty, IsNumber, IsEnum, IsMongoId } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum ProductType {
    NEW = 'New',
    OLD = 'Old'
}

export class CreateElonDto {
    @ApiProperty({ example: "iPhone 13", description: "Product name" })
    @IsString()
    @IsNotEmpty({ message: "Product name is required" })
    name: string;

    @ApiProperty({ example: 999, description: "Product price" })
    @IsNumber()
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @ApiProperty({ example: "Brand new iPhone with 256GB storage", description: "Product description" })
    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    desc: string;

    @ApiProperty({ example: "https://example.com/iphone13.jpg", description: "Product image URL" })
    @IsString()
    @IsNotEmpty({ message: "Image URL is required" })
    image: string;

    @ApiProperty({ example: "Very good product!", description: "Product comment" })
    @IsString()
    @IsNotEmpty({ message: "Comment is required" })
    comment: string;

    @ApiProperty({ example: "Black", description: "Product color" })
    @IsString()
    @IsNotEmpty({ message: "Color is required" })
    color: string;

    @ApiProperty({ example: ProductType.NEW, enum: ProductType, description: "Product type (New or Old)" })
    @IsEnum(ProductType, { message: "Type must be either 'New' or 'Old'" })
    @IsNotEmpty({ message: "Product type is required" })
    type: ProductType;

    @ApiProperty({ example: "65f3b2c8c9e3d6a1a4fcb39a", description: "User ID (MongoDB ObjectId)" })
    @IsMongoId()
    @IsNotEmpty({ message: "User ID is required" })
    userId: string;

    @ApiProperty({ example: "65f3b2c8c9e3d6a1a4fcb39b", description: "Category ID (MongoDB ObjectId)" })
    @IsMongoId()
    @IsNotEmpty({ message: "Category ID is required" })
    categoryId: string;
}
