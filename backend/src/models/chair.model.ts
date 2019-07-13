import {
    BaseEntity,
    Column, Entity,
    Index, JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {ChairTypeEnum} from './enums/chair-type.enum';
import PlaneModel from './plane.model';
import {IChair} from './interfaces/IChairs.interface';
import {Min, Max} from 'class-validator';
import {ChairSubTypeEnum} from './enums/chair-sub-type.enum';
import {ChairSubTypeModel} from './chair-sub-type.model';

@Entity()
export default class ChairModel extends BaseEntity implements IChair {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public number: number;

    @Column()
    @Min(0)
    @Max(150)
    public row: number;

    @Column('int')
    public type: ChairTypeEnum;

    @OneToMany(type => ChairSubTypeModel, subType => subType.subType)
    public subTypes: ChairSubTypeModel[];

    @Column()
    @Min(0)
    @Max(1)
    public isFree: 0 | 1 = 1;

    @Column()
    @Min(1)
    @Max(2)
    public floor: 1 | 2 = 1;

    @Column()
    public price: number = 0;

    @ManyToOne(type => PlaneModel, plane => plane.chairs)
    @JoinColumn()
    public plane: PlaneModel;
}

// const a = {"planes": [{
//     "id": 1,
//     "model": 'Boing-737-800',
//     "places": {
//     [1,1,0,1,1],
//     [1,1,0,1,1],
//     [1,1,0,1,1],
//     [1,1,0,1,1],
//     [1,1,0,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1],
//     [1,1,1,0,1,1,1]
// }}]};