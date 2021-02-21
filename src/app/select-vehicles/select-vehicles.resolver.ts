import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../app.service";
import { Vehicle } from "../common/models/vehicle.model";

@Injectable({
    providedIn: 'root'
})
export class SelectVehiclesResolver implements Resolve<Vehicle[]> {

    constructor(private appService: AppService) {} 

    resolve(): Vehicle[] | Observable<Vehicle[]> | Promise<Vehicle[]> {
        return this.appService.getVehicles$;
    }

}