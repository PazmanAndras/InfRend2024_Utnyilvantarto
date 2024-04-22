import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()

export class Driver{

    @PrimaryGeneratedColumn()
    Id: number | undefined

    @Column()
    name: string | undefined

    @Column()
    birthDate: string | undefined
    
    @Column()
    address: string | undefined

    @Column()
    licenseNumber: string | undefined

    @Column()
    licenseExpirationDate: string | undefined

}