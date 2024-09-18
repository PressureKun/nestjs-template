import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductCharacteristic extends Base {}
export class ProductCharacteristic {
    name: string;
    value: string;
}
