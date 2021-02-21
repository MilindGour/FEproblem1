import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Planet } from "../common/models/planet.model";

@Component({
    selector: 'app-select-planets',
    styleUrls: ['./select-planets.component.scss'],
    templateUrl: './select-planets.component.html'
})
export class SelectPlanetsComponent {
    
    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    readonly ALLOWED_PLANETS_COUNT = 4;
    selectedPlanets: Planet[] = [];
    
    allPlanets$ = this.activatedRoute.data.pipe(
        map(resolvedData => resolvedData.allPlanets)
    );
    
    onPlanetToggleChanged(planet: Planet, isSelected: boolean): void {
        if (isSelected) {
            this.selectedPlanets.push(planet);
        } else {
            this.selectedPlanets = this.selectedPlanets.filter(x => x !== planet);
        }
    }

    onChoosePlanetsClicked(): void {
        this.router.navigate(['select-vehicles'], { state: { selectedPlanets: this.selectedPlanets }});
    }
}