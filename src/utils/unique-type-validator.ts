import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { InjectConnection } from '@m8a/nestjs-typegoose';
import { Connection } from 'mongoose';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async validate(value: any, args: ValidationArguments) {
        const [ModelClass, property] = args.constraints;
        const model = this.connection.model(ModelClass.name);
        const entity = await model.findOne({ [property]: value }).exec();
        return !entity;
    }

    defaultMessage(args: ValidationArguments) {
        const [ModelClass, property] = args.constraints;
        return `${property} must be unique in ${ModelClass.name}`;
    }
}

export function IsUnique(ModelClass: any, property: string, validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [ModelClass, property],
            validator: IsUniqueConstraint,
        });
    };
}
