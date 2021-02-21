import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../app.service";
import { Planet } from "../common/models/planet.model";

@Injectable({
    providedIn: 'root'
})
export class SelectPlanetsResolver implements Resolve<Planet[]> {

    constructor(private appService: AppService) {} 

    resolve(): Planet[] | Observable<Planet[]> | Promise<Planet[]> {
        return this.appService.getPlanets$;
    }

}