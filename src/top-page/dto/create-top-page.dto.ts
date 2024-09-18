import { TopPageCategory } from '../types/top-page.types';
import { TopPageModel } from '../top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsUnique } from '../../utils/unique-type-validator';
import { Type } from 'class-transformer';

export class CreateTopPageHHDto {
    @IsNumber()
    count: number;

    @IsNumber()
    juniorSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;
}

export class CreateTopPageAdvantageDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class CreateTopPageDto {
    @IsEnum(TopPageCategory)
    firstLevelCategory: TopPageCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    title: string;

    @IsString()
    @IsUnique(TopPageModel, 'alias', { message: 'Alias must be unique' })
    alias: string;

    @IsString()
    category: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateTopPageHHDto)
    hh?: CreateTopPageHHDto;

    @IsArray()
    @ValidateNested()
    @Type(() => CreateTopPageHHDto)
    advantages: CreateTopPageAdvantageDto[];

    @IsString()
    pageDescriptionText: string;

    @IsString()
    tagsTitle: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];
}
