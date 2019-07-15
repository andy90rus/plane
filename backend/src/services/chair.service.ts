import ChairModel from '../models/chair.model';
import {ChairTypeEnum} from '../models/enums/chair-type.enum';

export class ChairService {
    public static async addChairToPlane(chair: ChairModel, plane) {
        const newChair = new ChairModel();
        newChair.plane = plane;
        newChair.number = chair.number;
        newChair.row = chair.row;
        newChair.isFree = chair.isFree;
        newChair.type = chair.type;
        newChair.subTypes = chair.subTypes;
        return newChair;
    }

    public static isChairUpdateValidate(chair: ChairModel): boolean {
        return chair.type !== ChairTypeEnum.Empty;
    }
}