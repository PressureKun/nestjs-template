import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { OBJECT_ID_VALIDATION_ERROR } from './object-id-validation.constants';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata): any {
        if (metadata.type !== 'param') {
            return value;
        }

        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(OBJECT_ID_VALIDATION_ERROR);
        }

        return value;
    }
}
