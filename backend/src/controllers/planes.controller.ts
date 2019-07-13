import {Body, Get, JsonController, Param, Post, Put} from 'routing-controllers';
import PlaneModel from '../models/plane.model';
import ChairModel from '../models/chair.model';
import {IPlane} from '../models/interfaces/IPlane.interface';
import {PlaneService} from '../services/planes.service';
import {ChairSubTypeEnum} from '../models/enums/chair-sub-type.enum';
import {ChairTypeEnum} from '../models/enums/chair-type.enum';
import {ChairService} from '../services/chair.service';
import {ChairSubTypeModel} from '../models/chair-sub-type.model';

@JsonController('/planes')
export class PlanesController {
    @Get('/:planeId')
    public async getPlaneMapById(@Param('planeId') planeId: number): Promise<IPlane> {
        return await PlaneModel.findOne({id: planeId},
            {relations: ['chairs', '']});
    }
    @Post('/')
    public async createPlane(@Body() plane: IPlane) {
        //Todo set type of variable as interface
        const newPlane = PlaneService.createNewPlane(plane);
        return await PlaneModel.save(newPlane);
    }
    //
    // @Get('/user/:id')
    // public async addUser(@Param('id') id: number) {
    //     return await UserModel.findOne(1);
    // }
    // @Get('/')
    // public async createUser() {
    //     const user = new UserModel();
    //     user.firstName = 'Andrey';
    //     user.lastName = 'KoroBeynikov';
    //     user.isActive = true;
    //     return await UserModel.save(user);
    // }
    // @Get('/users')
    // public async findUsers() {
    //     return await UserModel.find({});
    // }
    @Post('/addChair')
    public async addChairToPlane(@Body() chair: ChairModel) {
        const plane = await PlaneModel.findOne({id: 1});
        const newChair = await ChairService.addChairToPlane(chair, plane);
        return await newChair.save();
    }
}

