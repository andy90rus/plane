import {IPlane} from './IPlane.interface';
import {ChairTypeEnum} from '../enums/chair-type.enum';

export interface IChair {
    id: number;
    number: number;
    row: number;
    type: ChairTypeEnum;
    plane: IPlane;
    isFree: 0 | 1;
    price: number;
}