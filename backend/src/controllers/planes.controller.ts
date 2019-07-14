import {Body, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import PlaneModel from '../models/plane.model';
import ChairModel from '../models/chair.model';
import {IPlane} from '../models/interfaces/IPlane.interface';
import {PlaneService} from '../services/planes.service';

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
        const newChair = new ChairModel(chair);
        newChair.plane = plane;
        await newChair.save();
        // newChair.subTypes = await Promise.all(newChair.subTypes.map(
        //     async subType => {
        //         const newSubType = new ChairSubTypeModel(subType);
        //         newSubType.chair = newChair;
        //         return await newSubType.save()
        //     }));
        // newChair.subTypes.forEach(subType => delete subType.chair);

        delete newChair.plane;
        plane.chairs = plane.chairs || [];
        plane.chairs.push(newChair);
        return plane;
        // return await plane.save();
        // newChair.sa
        // return await plane.save();
        // const newChair = await ChairService.addChairToPlane(chair, plane);
        // return await newChair.save();

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

