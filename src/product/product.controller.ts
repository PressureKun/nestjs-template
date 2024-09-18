import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { FindProductDto } from './dto/find-product.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_ERROR_MSG } from './product.constants';
import { ObjectIdValidationPipe } from '../pipes/object-id-validation.pipe';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    async get(@Param('id', ObjectIdValidationPipe) id: string) {
        try {
            const product = await this.productService.findById(id);

            if (!product) {
                throw new HttpException(PRODUCT_ERROR_MSG.notFound, HttpStatus.NOT_FOUND);
            }

            return product;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ObjectIdValidationPipe) id: string) {
        try {
            const deletedProduct = await this.productService.deleteById(id);

            if (!deletedProduct) {
                throw new HttpException(PRODUCT_ERROR_MSG.notFound, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Patch(':id')
    @ApiBody({ type: CreateProductDto })
    async patch(@Param('id', ObjectIdValidationPipe) id: string, @Body() dto: CreateProductDto) {
        try {
            const updatedProduct = await this.productService.updateById(id, dto);

            if (!updatedProduct) {
                throw new HttpException(PRODUCT_ERROR_MSG.notFound, HttpStatus.NOT_FOUND);
            }

            return updatedProduct;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
