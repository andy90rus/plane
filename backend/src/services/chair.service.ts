import ChairModel from '../models/chair.model';
import {ChairSubTypeEnum} from '../models/enums/chair-sub-type.enum';

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
}