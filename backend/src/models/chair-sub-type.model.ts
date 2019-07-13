import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ChairSubTypeEnum} from './enums/chair-sub-type.enum';
import ChairModel from './chair.model';

@Entity()
export class ChairSubTypeModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @ManyToOne(type => ChairModel, chair => chair.subTypes)
    public subType: ChairSubTypeEnum;
}