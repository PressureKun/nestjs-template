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
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ObjectIdValidationPipe } from '../pipes/object-id-validation.pipe';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TopPageService } from './top-page.service';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TOP_PAGE_MSG } from './top-page.constants';

@ApiTags('top-page')
@Controller('top-page')
export class TopPageController {
    constructor(private readonly topPageService: TopPageService) {}

    @Post('create')
    async create(@Body() dto: CreateTopPageDto) {
        return this.topPageService.create(dto);
    }

    @Get(':id')
    async get(@Param('id', ObjectIdValidationPipe) id: string) {
        try {
            const topPage = await this.topPageService.findById(id);

            if (!topPage) {
                throw new HttpException(TOP_PAGE_MSG.notFound.id, HttpStatus.NOT_FOUND);
            }

            return topPage;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        try {
            const topPage = await this.topPageService.findByAlias(alias);

            if (!topPage) {
                throw new HttpException(TOP_PAGE_MSG.notFound.alias, HttpStatus.NOT_FOUND);
            }

            return topPage;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ObjectIdValidationPipe) id: string) {
        try {
            const deletedPage = await this.topPageService.deleteById(id);

            if (!deletedPage) {
                throw new HttpException(TOP_PAGE_MSG.notFound.id, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Patch(':id')
    @ApiBody({ type: CreateTopPageDto })
    async patch(@Param('id', ObjectIdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
        try {
            const updatedPage = await this.topPageService.updateById(id, dto);

            if (!updatedPage) {
                throw new HttpException(TOP_PAGE_MSG.notFound.id, HttpStatus.NOT_FOUND);
            }

            return updatedPage;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {}
}
