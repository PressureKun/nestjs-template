import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_ERROR_MSG } from './review.constants';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { getRequestUser } from '../decorators/request-user.decorator';
import { ObjectIdValidationPipe } from '../pipes/object-id-validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        try {
            return await this.reviewService.create(dto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@Param('id', ObjectIdValidationPipe) id: string) {
        try {
            const deletedDoc = await this.reviewService.delete(id);

            if (!deletedDoc) {
                throw new HttpException(REVIEW_ERROR_MSG.notFound, HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @UseGuards(JwtGuard)
    @Get('byProduct/:productId')
    async getByProduct(
        @Param('productId', ObjectIdValidationPipe) productId: string,
        @getRequestUser() email: string,
    ) {
        console.log('email of user req');
        console.log(email);
        try {
            return await this.reviewService.findByProductId(productId);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
