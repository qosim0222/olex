import { IsString, IsNotEmpty, IsNumber, IsEnum } from "class-validator";

enum ProductType {
    NEW = 'New',
    OLD = 'Old'
}

export class CreateElonDto {
    @IsString()
    @IsNotEmpty({ message: "Product name is required" })
    name: string;

    @IsNumber()
    @IsNotEmpty({ message: "Price is required" })
    price: number;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    desc: string;

    @IsString()
    @IsNotEmpty({ message: "Image URL is required" })
    image: string;

    @IsString()
    @IsNotEmpty({ message: "Comment is required" })
    comment: string;

    @IsString()
    @IsNotEmpty({ message: "Color is required" })
    color: string;

    @IsEnum(ProductType, { message: "Type must be either 'New' or 'Old'" })
    @IsNotEmpty({ message: "Product type is required" })
    type: ProductType;
}
