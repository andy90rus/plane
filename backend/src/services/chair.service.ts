import ChairModel from '../models/chair.model';
import {ChairSubTypeEnum} from '../models/enums/chair-sub-type.enum';
import {ChairSubTypeModel} from '../models/chair-sub-type.model';

export class ChairService {
    public static async addChairToPlane(chair: ChairModel, plane) {
        const newChair = new ChairModel();
        newChair.plane = plane;
        newChair.number = chair.number || 1;
        newChair.row = chair.row || 2;
        newChair.isFree = chair.isFree || 0;
        newChair.type = chair.type || 2;
        return newChair;
    }
}