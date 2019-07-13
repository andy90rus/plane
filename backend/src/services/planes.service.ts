import {IPlane} from '../models/interfaces/IPlane.interface';
import PlaneModel from '../models/plane.model';

export class PlaneService {
    public static createNewPlane(planeDetails: IPlane): PlaneModel {
        const newPlane = new PlaneModel();
        newPlane.model = planeDetails.model;// || 'Boing-737-800';
        newPlane.numberOfPassengers = planeDetails.numberOfPassengers;// || 158;
        newPlane.numberOfRows = planeDetails.numberOfRows;// || 28;
        return newPlane;
    }
}