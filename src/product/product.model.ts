import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';
import { ProductCharacteristic } from './types/product.types';

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {
    @prop()
    title: string;

    @prop()
    description: string;

    @prop()
    image: string;

    @prop()
    imageThumb: string;

    @prop()
    price: number;

    @prop()
    priceOld?: number;

    @prop()
    priceCredit: number;

    @prop()
    advantages: string;

    @prop()
    disadvantages: string;

    @prop({
        type: () => [String],
    })
    categories: string[];

    @prop({
        type: () => [String],
    })
    tags: string[];

    @prop({
        type: () => [ProductCharacteristic],
    })
    characteristics: ProductCharacteristic[];
}
