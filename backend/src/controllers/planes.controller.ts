import {Body, Delete, Get, JsonController, Param, Post} from 'routing-controllers';
import PlaneModel from '../models/plane.model';
import {IPlane} from '../models/interfaces/IPlane.interface';
import {PlaneService} from '../services/planes.service';

@JsonController('/planes')
export class PlanesController {
    @Get('/:planeId')
    public async getPlaneMapByPlaneId(@Param('planeId') planeId: number): Promise<IPlane> {
        return await PlaneModel.findOne({id: planeId},
            {relations: ['chairs']});
    }
    @Post('/')
    public async createPlane(@Body() plane: IPlane): Promise<IPlane> {
        const newPlane = PlaneService.createNewPlane(plane);
        return await PlaneModel.save(newPlane);
    }
    @Delete('/:planeId')
    public async deletePlane(@Param('planeId') planeId: number) {
        try {
            await PlaneModel.delete({id: planeId});
        } catch (e) {
            throw new Error(`Plane was not deleted. Body of error: ${e}`)
        }
        return {message: 'Plane was deleted successfully'};
    }
}

