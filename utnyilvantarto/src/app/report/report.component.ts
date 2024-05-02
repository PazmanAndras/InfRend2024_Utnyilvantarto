import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportService } from './report.service';
import { Car } from '../../../server/src/entity/Car';
import { NgForm } from '@angular/forms';


import { Trip } from '../../../server/src/entity/Trip';
import { Report } from '../models/Report';

import { ReportPlaces } from '../models/ReportPlaces';

import { ReportDates } from '../models/ReportDates';

import { ReportKM } from '../models/ReportKM';



@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{


  //adatok oszegyujtese tombbe 
  carsData: Car[] = [];

  tripData: Trip[] = [];

  reportsSum: Report[] = []; 


  //elore beallitott erteket adunk meg 
  defPl_number: string = '';
  defDate: string = '';



  CollectPlaces: ReportPlaces[] = [];

  dates: ReportDates[] = [];

  isSearch: boolean = false;

  minKm: number = 0;

  MinMax: ReportKM[] = [];


  ngOnInit(): void {
      
    this.reportService.getCars().subscribe((data: Car[]) => {
      this.carsData = data;
      
      if(this.carsData.length > 0 && this.carsData[0].lp_number !== undefined){
        this.defPl_number = this.carsData[0].lp_number;
      }    

    });

    this.reportService.getTrip().subscribe((data: Trip[]) => {


      // Assign the received trip data to the component variable
      this.tripData = data;
    
      // vegigmegyunk az adatokon, legordulo listaba
      this.tripData.forEach(trip => {


        //kezdodatum bealitasa
        const startDate = trip.startDate;

    
        // Check if the start date exists
        if (startDate) {


          // Split the start date into year, month, and day
          const [year, month, day] = startDate.split('-');
    
          // Create a new object to store the formatted date
          const newDates: ReportDates = {

            // Concatenate year and month to form the date format (e.g., YYYY-MM)
            dates: year + "-" + month,
          }

    
          // Check if the new date already exists in the dates array
          if (!this.dates.some(date => date.dates === newDates.dates)) {


            // If the new date doesn't exist, push it to the dates array
            this.dates.push(newDates);
            // Set the default date to the first date in the dates array
            this.defDate = this.dates[0].dates;
          }
        }
      });


    });



  }

  constructor(private reportService: ReportService) { }

  search(reportForm: NgForm){

    const inputDate = this.defDate;
    const [year, month] = inputDate.split('-');


    //starting vbalues
    let max: number = Number.MIN_VALUE; 
    let min: number = Number.MAX_VALUE;

    let sumMagan: Report = this.createReport(min, max, '', '', '');
    let sumCeges: Report = this.createReport(min, max, '', '', '');


      this.tripData.forEach(trip =>{

        if(trip.startDate){

          //feldaraboljuk a datumot a '-' menten 
          const [Tripyear, Tripmonth, Tripday] = trip.startDate.split('-');

          this.carsData.forEach(car =>{

            if( (reportForm.value.plateSelect == car.lp_number) && (car.car_type == trip.car) && (year == Tripyear && month == Tripmonth) ) /*Rászűrtem a lekérdezett időpontban az adott rendszámos autóra.*/
            {

                 /*Havi lebontásba a futott kilómétert.*/
                  if( (trip.newKm! > max && car.car_type == trip.car) ){

                    max = trip.newKm!;

                  }

                  if(trip.newKm! < min && car.car_type == trip.car){

                    min = trip.newKm!;
                    this.minKm = trip.distance!;

                  }

                const newMinMax: ReportKM = {

                  minKM: min,
                  maxKM: max,

                }

                //kezdo es befejezo helyszines
                const newPlaces: ReportPlaces = { 

                  startPlace: trip.startPlace!,
                  endPlace: trip.endPlace!,

                }

                // Magan ut adatai 
                if(trip.tripType == "Magán"){
                  sumMagan.distancePrivate += trip.distance!;
                  
                  //fogyasztas kiszamolasa 
                  sumMagan.consumptionPrivate += ((trip.distance! * car.consumption!)/100) * 480;


                  sumMagan.flatRatePrivate += trip.distance! * 10;
                  
                  sumMagan.allCostPrivate = sumMagan.consumptionPrivate + sumMagan.flatRatePrivate!;

                  sumMagan.tripType = "Magán";

                }

                //Ceges utak kiszamolasa
                else{
                  sumCeges.distanceCompany += trip.distance!;

                  sumCeges.consumptionCompany += ((trip.distance! * car.consumption!)/100) * 480; 

                  sumCeges.flatRateCompany += trip.distance! * 10;

                  sumCeges.allCostCompany = sumCeges.consumptionCompany + sumCeges.flatRateCompany!;

                  sumCeges.tripType = "Céges";
                }
                
                //hozzáadja a sumMagan objektumot a reportsSum tömbhöz
                this.reportsSum.push(sumMagan);
                this.reportsSum.push(sumCeges);
                this.CollectPlaces.push(newPlaces);
                this.MinMax.push(newMinMax);
                this.isSearch = true;

            }

          });

        }

      });

      //HA az autohoz csak 1 bejegyzes tartozik
      if(this.MinMax[0].maxKM == this.MinMax[0].minKM) 
      {

         this.MinMax[0].minKM -= this.minKm;

      }

  }

  newSearch(){
    location.reload();
  }

  createReport(startMileage: number, endMileage: number, startPlace: string, endPlace: string, tripType: string): Report{
      
    return {
        startMileage: startMileage,
        endMileage:endMileage,
        startPlace: startPlace,
        endPlace: endPlace,
        tripType: tripType,
        distancePrivate: 0,
        consumptionPrivate: 0,
        flatRatePrivate: 0,
        allCostPrivate: 0,
        distanceCompany: 0,
        consumptionCompany: 0,
        flatRateCompany: 0,
        allCostCompany: 0
    };

  }

}
