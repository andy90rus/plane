import {IPlane} from '../models/interfaces/IPlane.interface';
import PlaneModel from '../models/plane.model';

export class PlaneService {
    public static createNewPlane(planeDetails: IPlane): PlaneModel {
        const newPlane = new PlaneModel();
        newPlane.model = planeDetails.model;
        newPlane.numberOfPassengers = planeDetails.numberOfPassengers;
        newPlane.numberOfRows = planeDetails.numberOfRows;
        return newPlane;
    }
}