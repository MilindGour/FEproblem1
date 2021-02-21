import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, retry, switchMap } from "rxjs/operators";
import { Planet } from "./common/models/planet.model";
import { Vehicle } from "./common/models/vehicle.model";
import { URL_GET_PLANETS, URL_GET_VEHICLES, URL_POST_FIND, URL_POST_TOKEN } from "./common/url";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    getPlanets$ = this.http.get<Planet[]>(URL_GET_PLANETS);
    getVehicles$ = this.http.get<Vehicle[]>(URL_GET_VEHICLES);
    private postToken$ = this.http.post<PostTokenResponse>(URL_POST_TOKEN, {});

    postFind(planet_names: string[], vehicle_names: string[]) {
        return this.postToken$.pipe(
            retry(2),
            map(({ token }) => Object.assign({}, { token, planet_names, vehicle_names })),
            switchMap(body => this.http.post<PostFindResponse>(URL_POST_FIND, body))
        );
    }
}

export class PostTokenResponse {
    token!: string;
}
export class PostFindResponse {
    status?: string;
    planet_name?: string;
    error?: string;
}