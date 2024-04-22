import { Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { DriversComponent } from './drivers/drivers.component';


export const routes: Routes = [

    {
        path: "",
        component: CarComponent,
    },

    {
        path: "car",
        component: CarComponent,
    },

    {
        path: "drivers",
        component: DriversComponent,
    },

];
