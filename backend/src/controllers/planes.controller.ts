import {Body, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import PlaneModel from '../models/plane.model';
import ChairModel from '../models/chair.model';
import {IPlane} from '../models/interfaces/IPlane.interface';
import {PlaneService} from '../services/planes.service';
import {ChairSubTypeEnum} from '../models/enums/chair-sub-type.enum';
import {ChairTypeEnum} from '../models/enums/chair-type.enum';
import {ChairService} from '../services/chair.service';
import {ChairSubTypeModel} from '../models/chair-sub-type.model';
import {create} from 'domain';

@JsonController('/planes')
export class PlanesController {
    @Get('/:planeId')
    public async getPlaneMapById(@Param('planeId') planeId: number): Promise<IPlane> {
        return await PlaneModel.findOne({id: planeId},
            {relations: ['chairs']});
    }
    @Post('/')
    public async createPlane(@Body() plane: IPlane) {
        //Todo set type of variable as interface
        const newPlane = PlaneService.createNewPlane(plane);
        return await PlaneModel.save(newPlane);
    }
    @Post('/addChair')
    public async addChairToPlane(@Body() chair: ChairModel) {
        const plane = await PlaneModel.findOne({id: 1});
        const newChair = await ChairService.addChairToPlane(chair, plane);
        return await newChair.save();
    }
    @Put('/updateChairs')
    public async updateChairs(@Body() chairs: ChairModel[]) {
        return Promise.all(
            chairs.map(async (chair) => {
                const updatedChair: ChairModel =  await ChairModel.findOne({id: chair.id});
                updatedChair.isFree = chair.isFree;
                return await ChairModel.save(updatedChair);
            }));
    }

}

