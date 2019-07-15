import {Body, Get, JsonController, Post, Put, QueryParam} from 'routing-controllers';
import ChairModel from '../models/chair.model';
import {IChair} from '../models/interfaces/IChairs.interface';
import PlaneModel from '../models/plane.model';
import {In, Not} from 'typeorm';

@JsonController('/chairs')
export class ChairsController {
    @Get('/getChair')
    public async getChair(@QueryParam('planeId') planeId: number,
                          @QueryParam('chairId') chairId: number): Promise<ChairModel> {
        const plane = await PlaneModel.findOne({id: planeId});
        return await ChairModel.findOne({id: chairId, plane: plane});
    }
    @Post('/addChair')
    public async addChairToPlane(@Body() body: {planeId: number, chair: ChairModel}): Promise<IChair> {
        const plane = await PlaneModel.findOne({id: body.planeId});
        const newChair = new ChairModel(body.chair);
        newChair.plane = plane;
        return await newChair.save();
    }
    /**
     * Update Chairs information: only "isFree" and "price"
     */
    @Put('/updateChairsInfo')
    public async updateChairsInfo(@Body() body: {planeId: number, chairs: ChairModel[]}): Promise<IChair[]> {
        const chairsId = body.chairs.map(x => x.id);
        const dbChairs: ChairModel[] = await ChairModel.find({ where: {
                id: In(chairsId),
                type: Not('0')
            }});
        dbChairs.forEach(updatedChairs => {
            const ch = body.chairs.find(chair => chair.id === updatedChairs.id);
            updatedChairs.isFree = ch.isFree;
            updatedChairs.price = ch.price;
        });
        return await ChairModel.save(dbChairs);
    }
}