import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Planet } from "../common/models/planet.model";
import { Vehicle } from "../common/models/vehicle.model";
import { PlanetDroppable } from "../common/models/planet-droppable.model";
import { VehicleDraggable } from "../common/models/vehicle-draggable.model";
import { AppService } from "../app.service";
import { map, startWith, tap } from "rxjs/operators";
import { combineLatest, Observable, Subject } from "rxjs";
import { SearchResult, SearchResultComponent } from "../search-result/search-result.component";

@Component({
    selector: 'app-select-vehicles',
    styleUrls: ['./select-vehicles.component.scss'],
    templateUrl: './select-vehicles.component.html'
})
export class SelectVehiclesComponent implements OnInit {

    planetDropables: PlanetDroppable[] = [];
    selectedPlanets: Planet[] = [];
    planetVehicleSelections: [Planet, Vehicle][] = [];
    startSearchDisabled = true;
    totalTimeTaken: number = 0;

    resetAction$ = new Subject<boolean>();
    reset$ = this.resetAction$.pipe(
        tap(() => {
            this.initializeComponent();
        })

    ).pipe(startWith(true));

    allVehicles$ = this.activatedRoute.data.pipe(
        map(resolvedData => resolvedData.allVehicles)
    );

    vehicleDraggables$ = combineLatest([this.reset$, this.allVehicles$]).pipe(
        map(([, allVehicles]) => {
            return allVehicles.map((vehicle: Vehicle) => {
                const dropListData: Vehicle[] = [];
                for (let i = 0; i < vehicle.total_no; i++) {
                    const instance = Object.assign({}, vehicle, { total_no: 1 });
                    dropListData.push(instance);
                }
                return { vehicle, dropListData };
            })
        })
    );

    get planetDropableIDs() {
        return this.planetDropables.map(x => x.id);
    }

    constructor(private router: Router, private appService: AppService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.initializeComponent();
    }
    private initializeComponent() {
        this.totalTimeTaken = 0;
        this.startSearchDisabled = true;
        this.planetVehicleSelections = [];
        this.selectedPlanets = history.state.selectedPlanets || [];

        if (this.selectedPlanets.length === 0) {
            // page has been refreshed, goto home
            this.router.navigate(['/home']);
        }

        this.initPlanetDropables(this.selectedPlanets);
    }

    initPlanetDropables(selectedPlanets: Planet[]) {
        this.planetDropables = selectedPlanets.map((planet) => {
            const id = 'planet_' + planet.name.toLowerCase().replace(/ /g, '');
            return { id, planet };
        });
    }

    onPlanetVehicleSelectionComplete(event: [Planet, Vehicle]) {
        this.planetVehicleSelections.push(event);
        const timeTaken = event[0].distance / event[1].speed;
        this.totalTimeTaken += timeTaken;

        this.startSearchDisabled = this.planetVehicleSelections.length !== this.planetDropables.length;
    }

    onResetClicked() {
        this.resetAction$.next(true);
    }

    onStartSearchClicked(): void {
        const { planet_names, vehicle_names } = this.separatePlanetsAndVehicles(this.planetVehicleSelections);
        this.appService.postFind(planet_names, vehicle_names).subscribe(postFindResponse => {
            if (postFindResponse.status) {
                const searchResult: SearchResult = {
                    found: false
                };
                if (postFindResponse.status === 'success') {
                    searchResult.found = true;
                    searchResult.planetName = postFindResponse.planet_name;
                    searchResult.timeTaken = this.totalTimeTaken;
                } else {
                    searchResult.found = false;
                }
                this.router.navigate(['/search-result'], { state: { searchResult } });
            }
        });
    }

    private separatePlanetsAndVehicles(planetVehicleSelections: [Planet, Vehicle][]): { planet_names: string[], vehicle_names: string[] } {
        const planet_names: string[] = [];
        const vehicle_names: string[] = [];

        planetVehicleSelections.forEach(([planet, vehicle]) => {
            planet_names.push(planet.name);
            vehicle_names.push(vehicle.name);
        });

        return { planet_names, vehicle_names };
    }
}
