import { ProductCharacteristic } from '../types/product.types';
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCharacteristicDto extends ProductCharacteristic {
    @IsString()
    name: string;

    @IsString()
    value: string;
}

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsString()
    imageThumb: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    priceOld?: number;

    @IsNumber()
    priceCredit: number;

    @IsString()
    advantages: string;

    @IsString()
    disadvantages: string;

    @IsArray()
    @IsString({ each: true })
    categories: string[];

    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @IsArray()
    @ValidateNested()
    @Type(() => ProductCharacteristicDto)
    characteristics: ProductCharacteristicDto[];
}
