import {Body, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import PlaneModel from '../models/plane.model';
import ChairModel from '../models/chair.model';
import {IPlane} from '../models/interfaces/IPlane.interface';
import {PlaneService} from '../services/planes.service';
import {IChair} from '../models/interfaces/IChairs.interface';
import {ChairService} from '../services/chair.service';

@JsonController('/planes')
export class PlanesController {
    @Get('/:planeId')
    public async getPlaneMapById(@Param('planeId') planeId: number): Promise<IPlane> {
        return await PlaneModel.findOne({id: planeId},
            {relations: ['chairs']});
    }
    @Post('/')
    public async createPlane(@Body() plane: IPlane): Promise<IPlane> {
        const newPlane = PlaneService.createNewPlane(plane);
        return await PlaneModel.save(newPlane);
    }
    @Post('/:planeId/addChair')
    public async addChairToPlane(@Param('planeId') planeId: number,
                                 @Body() chair: ChairModel): Promise<IChair> {
        const plane = await PlaneModel.findOne({id: planeId});
        const newChair = new ChairModel(chair);
        newChair.plane = plane;
        return await newChair.save();
    }
    @Put('/:planeId/updateChairs')
    public async updateChairs(@Param('planeId') planeId: number,
                              @Body() chairs: ChairModel[]): Promise<IChair[]> {
        return Promise.all(
            chairs.map(async (chair) => {
                const updatedChair: ChairModel =  await ChairModel.findOne({id: chair.id});
                if (ChairService.isChairUpdateValidate(updatedChair)) {
                    updatedChair.isFree = chair.isFree;
                    updatedChair.price = chair.price || updatedChair.price;
                    return await ChairModel.save(updatedChair);
                }
                //TODO return null if condition not true;
            }));
    }
}

