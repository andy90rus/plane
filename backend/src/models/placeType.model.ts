import {BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
// import PlaceModel from './places.model';

@Entity()
export default class PlaceTypeModel extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToMany(type => PlaceModel, item => item.place_id)
    @Index()
    @Column()
    place_type_id: number;

    @Column()
    name: string;
}