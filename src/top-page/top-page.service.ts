import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
    constructor(
        @InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>,
    ) {}

    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateTopPageDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}
