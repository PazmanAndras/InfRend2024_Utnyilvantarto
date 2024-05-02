import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { DriverService } from './drivers.service';

import { Driver } from '../../../server/src/entity/Driver';


@Component({

  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.css'

})
export class DriversComponent implements OnInit {


  //Eltaroljuk a soforoket
  drivers: Driver[] = [];

  constructor(private driverService: DriverService) { }

  isLogged: boolean = false;

  ngOnInit(): void {

      // Retrieve the list of drivers from the driver service
      this.driverService.getDrivers().subscribe((data: Driver[]) =>{
        this.drivers = data;
      })
      
  }

  modifyForm: boolean = false;


  selectedDriver: Driver[] = [];



  /**
   * Checks if the driver's license has expired.
   * @param drivers The Driver object containing license information.
   * @returns A boolean indicating whether the license has expired (true) or not (false).
   */
  isLicenseExpired(drivers: Driver): boolean{

    // Check if license expiration date is provided
    if(drivers.licenseExpirationDate){

      // Get current date and expiration date
      const currentDate = new Date();
      const expirationDate = new Date(drivers.licenseExpirationDate);

      // Extract years from current date and expiration date
      const currentYear = currentDate.getFullYear();
      const expirationYear = expirationDate.getFullYear();

      
      if( currentYear > expirationYear ){
        // If current year is greater than expiration year, license has expired
        return true;
      }

      else if(currentYear == expirationYear){

          // If years are equal, compare months
          const currentMonth = currentDate.getMonth();
          const expirationMonth = expirationDate.getMonth();

          if(currentMonth > expirationMonth)
          {
            // If current month is greater than expiration month, license has expired
            return true;
          }
          else if(currentMonth == expirationMonth){

            // If months are equal, compare days
            const currentDay = currentDate.getDay();
            const expirationDay = expirationDate.getDay();

            if(currentDay > expirationDay){
              // If current day is greater than expiration day, license has expired
              return true;
            }
          }
      }
  }

    // If expiration date is not provided or if expiration hasn't occurred yet, license is not expired
    return false;
  }



  changeDriver(driver: Driver){

    this.modifyForm = true;

    this.selectedDriver = [driver];

  }

  saveDriverChanges(selectedDriver: Driver) {

    // Find the index of the selected driver in the drivers array
    const index = this.drivers.findIndex((driver) => driver.Id == selectedDriver.Id);

    // hogyha a sofor megtalalhato 

    if (index > -1) {

      // upda  sofor 
      this.driverService.updateDriver(selectedDriver).subscribe(() => {

          // Upon successful update, retrieve the updated list of drivers
          this.driverService.getDrivers().subscribe((data: Driver[]) => { 

            this.drivers = data;

            //elrejtjuk a modositas formot valtoztatas utan 
            this.hideChangesForm();
          });
        });  
  }
}
  
  hideChangesForm(){

    this.modifyForm = false;

  }

  //legorgetes a modofyformhoz
  scrollToModifyForm(form: any) {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

  
}
