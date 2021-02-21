import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { Planet } from "../common/models/planet.model";
import { SelectPlanetsComponent } from "./select-planets.component"

const mockAllPlanets: Planet[] = [
    { name: 'Mock planet 1', distance: 1 },
    { name: 'Mock planet 2', distance: 2 }
];
class MockRouter { navigate(args: any) { } }
class MockActivatedRoute {
    data = of({
        allPlanets: mockAllPlanets
    });
}

describe('SelectPlanetsComponent', () => {
    let component: SelectPlanetsComponent;
    let router: Router;
    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                SelectPlanetsComponent,
                { provide: Router, useClass: MockRouter },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        }).compileComponents();

        component = TestBed.inject(SelectPlanetsComponent);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
    })

    it('should set the correct value of allPlanets$', () => {
        component.allPlanets$.subscribe((x) => {
            expect(x).toBe(mockAllPlanets);
        })
    })

    it('should add a planet on toggle - true', () => {
        component.onPlanetToggleChanged(mockAllPlanets[0], true);
        expect(component.selectedPlanets).toHaveSize(1);
        expect(component.selectedPlanets).toContain(mockAllPlanets[0]);
    })

    it('should remove a planet on toggle - false', () => {
        component.selectedPlanets = [mockAllPlanets[0]];
        component.onPlanetToggleChanged(mockAllPlanets[0], false);
        expect(component.selectedPlanets).toHaveSize(0);
    })

    it('should navigate away with correct parameters', () => {
        const spy = spyOn(router, 'navigate');
        component.selectedPlanets = [mockAllPlanets[0]];
        component.onChoosePlanetsClicked();

        expect(spy).toHaveBeenCalledWith(['select-vehicles'], { state: { selectedPlanets: [mockAllPlanets[0]] } })
    })
})