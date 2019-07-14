import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import ChairModel from './chair.model';
import {IPlane} from './interfaces/IPlane.interface';
import {Min} from 'class-validator';

@Entity()
export default class PlaneModel extends BaseEntity implements IPlane {
    @PrimaryGeneratedColumn()
    public id: number;

    @Index()
    @Column()
    public model: string;

    @Column()
    @Min(1)
    public numberOfRows: number;

    @Column()
    public numberOfPassengers: number;

    @OneToMany(type => ChairModel, chair => chair.plane, {cascade: true})
    public chairs: ChairModel[];
}