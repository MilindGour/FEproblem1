import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SelectPlanetsComponent } from './select-planets/select-planets.component';
import { SelectPlanetsResolver } from './select-planets/select-planets.resolver';
import { SelectVehiclesComponent } from './select-vehicles/select-vehicles.component';
import { SelectVehiclesResolver } from './select-vehicles/select-vehicles.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'select-planets', component: SelectPlanetsComponent, resolve: { allPlanets: SelectPlanetsResolver } },
  { path: 'select-vehicles', component: SelectVehiclesComponent, resolve: { allVehicles: SelectVehiclesResolver } },
  { path: 'search-result', component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
