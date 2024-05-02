import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


import { Car } from '../../../server/src/entity/Car';
import { Driver } from '../../../server/src/entity/Driver';
import { Trip } from '../../../server/src/entity/Trip';


import { TripService } from './trips.service';


@Component({
  selector: 'trips-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css'
})



export class TripsListComponent implements OnInit{

  availableDrivers: Driver[] = [];

  carsData: Car[] = [];

  driversData: Driver[] = [];

  tripsData: Trip[] = [];

  selectedTrip: Trip[] = [];




  // alapra allitva 
  defaultCar: string = '';
  defaultDriver: string = '';




  isVisibleChangeForm: boolean = false;

  
 

  constructor(private tripService: TripService) { }

  ngOnInit(): void   // Ugyanugy le kell kerni hogy a legordulő listaba megjelenjen 
  {

    //Adatok asszinkron lekérdezése 
    /*
      GetCars()-tól kapott adatok vételekor a kapott adatokat a komponens carsData tulajdonságához rendeli.
    */


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


  isLicenseExpired(driverData: Driver): boolean {   // Ugyanugy kel lez is mert akkor olyat is lehetne modositani akinek le van jarva ajogsi
    if (driverData.licenseExpirationDate) {

        const currentDate = new Date();
        const expirationDate = new Date(driverData.licenseExpirationDate);

        const currentYear = currentDate.getFullYear();
        const expirationYear = expirationDate.getFullYear();

        if (currentYear > expirationYear) {
            return true;
        
            //lebotnani honapra 
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


  changeTrip(tripsData: Trip){

    this.isVisibleChangeForm = true;

    this.selectedTrip = [tripsData];
  }



  saveTripChanges(selectedTrip: Trip){

    const tripData = {
      Id: selectedTrip.Id,
      car: selectedTrip.car || this.carsData[0].car_type,
      driver: selectedTrip.driver || this.driversData[0].name,
      startDate: selectedTrip.startDate,
      tripType: selectedTrip.tripType,
      startPlace: selectedTrip.startPlace,
      endPlace: selectedTrip.endPlace,
      distance: selectedTrip.distance,
      newKm: selectedTrip.newKm,

    }

    
      const index = this.tripsData.findIndex((x) => x.Id == selectedTrip.Id);

      if (index > -1) {
        this.tripService.updateTrip(selectedTrip).subscribe(() => {
            this.tripService.getTrip().subscribe((data: Trip[]) => { /*Így egyből lefrissül.*/
              this.tripsData = data;
              this.hideChangesForm();
            });
          });
      }
    

  }

  hideChangesForm(){

    this.isVisibleChangeForm = false;

  }

}