import { Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { DriversComponent } from './drivers/drivers.component';
import { TripsComponent } from './trips/trips.component';
import { ReportComponent } from './report/report.component';
//import { RegistrationComponent } from './registration/registration.component';
import { TripsListComponent } from './trips-list/trips-list.component';


export const routes: Routes = [

    {
        path: "",
        component: CarComponent,
    },

    {
        path: "cars",
        component: CarComponent,
    },

    {
        path: "drivers",
        component: DriversComponent,
    },

    {
        path: "trips",
        component: TripsComponent,
    },

    {
        path: "trips-list",
        component: TripsListComponent,
    },
    {
        path: "report",
        component: ReportComponent,
    },

    

];
