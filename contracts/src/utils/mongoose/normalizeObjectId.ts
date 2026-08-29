import { Types } from 'mongoose';

export class NormalizeObjectId {
    static getObjectIdOrString(value: string): Array<string | Types.ObjectId> {
        const values: Array<string | Types.ObjectId> = [value];
        if (Types.ObjectId.isValid(value)) {
            values.push(new Types.ObjectId(value));
        }
        return values;
    }
}