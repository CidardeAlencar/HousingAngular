import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Find a city" #filter>
        <button type="button" class="primary" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly baseUrl='https://angular.io/assets/images/tutorials/faa';
  housingLocationList:HousingLocation[]=[];
  housingService: HousingService = inject(HousingService);

  //search
  filteredLocationList: HousingLocation[]=[];


  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList:
      HousingLocation[])=>{
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = this.housingLocationList;
      }
    );
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
