import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Car{

    @PrimaryGeneratedColumn()
    Id: number | undefined
    
    @Column()
    lp_number: string | undefined

    @Column()
    car_type: string | undefined

    @Column()
    fuel: string | undefined

    @Column()
    consumption: number | undefined

    @Column()
    start_km: number | undefined

}