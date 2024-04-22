import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Car } from './entity/Car'
import { Driver } from './entity/Driver'
import { Trip } from './entity/Trip'
import { User } from './entity/User'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306, 
    username: 'root',
    database: 'utnyilvantarto',
    synchronize: true,
    logging: false,
    entities: [Car, Driver, Trip, User],
    migrations: [],
    subscribers: [],
})
