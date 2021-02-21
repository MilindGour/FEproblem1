import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectPlanetsComponent } from './select-planets/select-planets.component';
import { HomeComponent } from './home/home.component';
import { PlanetComponent } from './common/planet/planet.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { SelectVehiclesComponent } from './select-vehicles/select-vehicles.component';
import { VehicleDragContainerComponent } from './common/vehicle-drag-container/vehicle-drag-container.component';
import { VehicleDraggableComponent } from './common/vehicle-draggable/vehicle-draggable.component';
import { PlanetDroppableComponent } from './common/planet-droppable/planet-droppable.component';
import { AppHttpInterceptor } from './common/http.interceptor';
import { SearchResultComponent } from './search-result/search-result.component';
import { LoaderComponent } from './common/loader/loader.component';

@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SelectPlanetsComponent,
    PlanetComponent,
    SelectVehiclesComponent,
    VehicleDragContainerComponent,
    VehicleDraggableComponent,
    PlanetDroppableComponent,
    SearchResultComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
