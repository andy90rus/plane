import {IPlane} from './IPlane.interface';
import {ChairTypeEnum} from '../enums/chair-type.enum';

export interface IChair {
    id: number;
    number: number;
    row: number;
    type: ChairTypeEnum;
    plane: IPlane;
    isFree: boolean;
    price: number;
}