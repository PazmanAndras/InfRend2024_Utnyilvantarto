import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarService } from './car.service';


import { Car } from '../../../server/src/entity/Car';

@Component({
  selector: 'app-car-register',
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

  /*
  Amikor a komponens inicializálódik (ngOnInit meghívódik), végrehajtódik a ngOnInit() metódusban lévő kód.
  Meghívja a carService getCars() metódusát, hogy lekérje az autók listáját a szerverről.
  Subsribe-ol az Observable-re, amit a getCars() metódus visszaad. Ez azt jelenti, hogy értesítést kap, amikor elérhető vagy változik az adat.
  Amikor az Observable adatot (azaz amikor a HTTP kérés sikeresen lezajlik), végrehajtódik a megadott visszahívási függvény.
  A visszahívási függvényben az adata a szerverről (egy autók tömbje) a komponens cars tulajdonságához kerül hozzárendelésre.
  */
 
}
