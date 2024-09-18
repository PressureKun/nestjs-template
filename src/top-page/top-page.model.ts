import { TopPageCategory } from './types/top-page.types';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export class TopPageHHModel {
    @prop()
    count: number;

    @prop()
    juniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;
}

export interface TopPageAdvantage extends Base {}
export class TopPageAdvantage {
    @prop()
    title: string;

    @prop()
    description: string;
}

export interface TopPageModel extends Base {}
export class TopPageModel extends TimeStamps {
    @prop([{ enum: TopPageCategory }])
    firstLevelCategory: TopPageCategory;

    @prop()
    secondCategory: string;

    @prop()
    title: string;

    @prop({ unique: true })
    alias: string;

    @prop()
    category: string;

    @prop({ type: () => TopPageHHModel })
    hh?: TopPageHHModel;

    @prop({ type: () => [TopPageAdvantage] })
    advantages: TopPageAdvantage[];

    @prop()
    pageDescriptionText: string;

    @prop()
    tagsTitle: string;

    @prop({
        type: () => [String],
    })
    tags: string[];
}
