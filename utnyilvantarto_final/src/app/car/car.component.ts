import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import { Car } from '../../../server/src/entity/Car';

@Component({
  selector: 'car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void{
    this.carService.getCars().subscribe((data: Car[]) =>{
      this.cars = data;
    });
  }
 
}
