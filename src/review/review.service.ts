import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from '@m8a/nestjs-typegoose';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

    async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
        if (!this.isValidObjectId(productId)) {
            throw new BadRequestException('Invalid product ID');
        }
        return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
    }

    async deleteByProductId(productId: string) {
        if (!this.isValidObjectId(productId)) {
            throw new BadRequestException('Invalid product ID');
        }
        return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
    }

    private isValidObjectId(id: string): boolean {
        return Types.ObjectId.isValid(id);
    }
}
