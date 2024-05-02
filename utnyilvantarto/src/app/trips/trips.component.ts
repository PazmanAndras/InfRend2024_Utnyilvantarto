import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TripService } from './trips.service';

import { Car } from '../../../server/src/entity/Car';


import { Driver } from '../../../server/src/entity/Driver';


import { Trip } from '../../../server/src/entity/Trip';



@Component({
  selector: 'record-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})


export class TripsComponent implements OnInit{

  availableDrivers: Driver[] = [];

  carsData: Car[] = [];

  driversData: Driver[] = [];

  tripsData: Trip[] = [];


  //alap ertek beallitasa a form-ba 
  defaultCar: string = '';
  defaultDriver: string = '';

  defaultType: string = 'Magán';
  defaultReturn: string = 'Nem';


  selectedTrip: Trip[] = [];


  constructor(private tripService: TripService) { }

  ngOnInit(): void
  {

    //Adatok asszinkron lekérdezése 
    /*
      GetCars()-tól kapott adatok vételekor a kapott adatokat a komponens carsData tulajdonságához rendeli.
    */
    this.tripService.getCars().subscribe((data: Car[]) => {
      this.carsData = data;
      

      /*
      Ellenőrzi, hogy vannak-e elérhető autók (this.carsData.length > 0), 
      és hogy az első autó típusa meg van-e határozva. 
      Ha igen, akkor a defaultCar tulajdonsagot az elso autó típusara allítja be.
      */

      if(this.carsData.length > 0 && this.carsData[0].car_type !== undefined){
        this.defaultCar = this.carsData[0].car_type;
      }

    });

    this.tripService.getDrivers().subscribe((data: Driver[]) =>{
      this.driversData = data;

      //megnézi hogy a licence lejárt - e már , ha lejart mar nem lesz valaszthato a sofor 
      this.availableDrivers = this.driversData.filter(driver => !this.isLicenseExpired(driver));

      if(this.driversData.length > 0 && this.driversData[0].name !== undefined){
        this.defaultDriver = this.driversData[0].name;
      }
    });
    

    //A getTrip()-bol való adat eleresekor  a kapott adatokat a komponens tripsData tulajdonsagahoz rendeli.
    this.tripService.getTrip().subscribe((data: Trip[]) => {
      this.tripsData = data;
    });


  }



  //Lejaro jogositvany vizsgalata 

  isLicenseExpired(driverData: Driver): boolean {
    if (driverData.licenseExpirationDate) {

        const currentDate = new Date();
        const expirationDate = new Date(driverData.licenseExpirationDate);

        const currentYear = currentDate.getFullYear();
        const expirationYear = expirationDate.getFullYear();

        if (currentYear > expirationYear) {
            return true;
        } else if (currentYear === expirationYear) {
            const currentMonth = currentDate.getMonth();
            const expirationMonth = expirationDate.getMonth();

            if (currentMonth > expirationMonth) {
                return true;
            } else if (currentMonth === expirationMonth) {
                const currentDay = currentDate.getDate();
                const expirationDay = expirationDate.getDate();

                if (currentDay > expirationDay) {
                    return true;
                }
            }
        }
    }
    return false;
}





  saveTrip(addTripForm: NgForm){

    
    const tripData = {
      Id: addTripForm.value.Id,
      car: addTripForm.value.carSelect || this.carsData[0].car_type,
      driver: addTripForm.value.driverSelect || this.driversData[0].name,
      startDate: addTripForm.value.startDate,
      tripType: addTripForm.value.type,
      startPlace: addTripForm.value.startPlace,
      endPlace: addTripForm.value.endPlace,
      distance: addTripForm.value.distance,
      newKm: addTripForm.value.newMileage,
      return: addTripForm.value.return 

    }

    // HA a form ba ne ma return
    this.tripService.postTrip(tripData).subscribe(() =>{ 

    location.reload();  

    });

    if(tripData.return == 'Igen') 
    {
  
      const tripData = {
        Id: addTripForm.value.Id,
        car: addTripForm.value.carSelect || this.carsData[0].car_type,
        driver: addTripForm.value.driverSelect || this.driversData[0].name,
        startDate: addTripForm.value.startDate,
        tripType: addTripForm.value.type,
        startPlace: addTripForm.value.endPlace,
        endPlace: addTripForm.value.startPlace,
        distance: addTripForm.value.distance,
        newKm: parseInt(addTripForm.value.newMileage) + parseInt(addTripForm.value.distance),
  
      }
  
      this.tripService.postTrip(tripData).subscribe(() =>{
  
        location.reload();
  
      });
  
    }

   

  }

 


}
