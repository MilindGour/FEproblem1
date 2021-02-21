import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { AppService, PostFindResponse } from "../app.service";
import { Planet } from "../common/models/planet.model";
import { Vehicle } from "../common/models/vehicle.model";
import { SearchResult } from "../search-result/search-result.component";
import { SelectVehiclesComponent } from "./select-vehicles.component"

const mockAllVehicles: Vehicle[] = [
    { name: 'Mock vehicle 1', max_distance: 1, speed: 4, total_no: 1 },
    { name: 'Mock vehicle 2', max_distance: 2, speed: 5, total_no: 2 }
];

const mockSelectedPlanets: Planet[] = [
    { name: 'Mock planet 1', distance: 200 },
    { name: 'Mock planet 2', distance: 400 }
];

const mockPostFindResponse: PostFindResponse = {
    status: 'success',
    planet_name: mockSelectedPlanets[0].name,
    error: ''
};

class MockRouter { navigate(args: any) { } }
class MockActivatedRoute {
    data = of({
        allVehicles: mockAllVehicles
    });
}
class MockAppService {
    postFind(planetNames: string[], vehicleNames: string[]) {
        return of(mockPostFindResponse);
    }
}

describe('SelectVehiclesComponent', () => {
    let component: SelectVehiclesComponent;
    let router: Router;
    let appService: AppService;
    let activatedRoute: ActivatedRoute;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            providers: [
                SelectVehiclesComponent,
                { provide: Router, useClass: MockRouter },
                { provide: AppService, useClass: MockAppService },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ]
        }).compileComponents();

        component = TestBed.inject(SelectVehiclesComponent);
        router = TestBed.inject(Router);
        appService = TestBed.inject(AppService);
        activatedRoute = TestBed.inject(ActivatedRoute);

        const mockState = {
            selectedPlanets: mockSelectedPlanets
        };
        
        Object.defineProperty(history, 'state', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: mockState
        });
    })

    it('should initialize correctly', () => {
        component.ngOnInit();
        expect(component.totalTimeTaken).toBe(0);
        expect(component.startSearchDisabled).toBe(true);
        expect(component.planetVehicleSelections).toHaveSize(0);
        expect(component.selectedPlanets).toBe(mockSelectedPlanets);
        expect(component.planetDropables.length).toBeGreaterThan(0);

        component.allVehicles$.subscribe(x => {
            expect(x).toBe(mockAllVehicles);
        });
    })

    it('should update variables onPlanetVehicleSelectionComplete', () => {
        const mockEvent: [Planet, Vehicle] = [ mockSelectedPlanets[0], mockAllVehicles[0] ];
        component.onPlanetVehicleSelectionComplete(mockEvent);
        
        expect(component.planetVehicleSelections).toContain(mockEvent);
        expect(component.totalTimeTaken).toBe(50);
        expect(component.startSearchDisabled).toBe(true);
    })

    it('should behave correctly onStartSearchClicked', () => {
        const spy = spyOn(router, 'navigate').and.callThrough();
        const mockSearchResult: any = {
            found: true,
            planetName: mockSelectedPlanets[0].name,
            timeTaken: 130
        };
        component.planetVehicleSelections = [
            [mockSelectedPlanets[0], mockAllVehicles[0]],
            [mockSelectedPlanets[1], mockAllVehicles[1]]
        ];
        component.totalTimeTaken = 130;
        
        component.onStartSearchClicked();
        
        expect(spy).toHaveBeenCalledWith(['/search-result'], { state: { searchResult: mockSearchResult } });
    })

    it('should return correct pairs on separatePlanetsAndVehicles', () => {
        const planetVehicleSelections: [Planet, Vehicle][] = [
            [ mockSelectedPlanets[0], mockAllVehicles[0] ],
            [ mockSelectedPlanets[1], mockAllVehicles[1] ]
        ];

        const result = component['separatePlanetsAndVehicles'](planetVehicleSelections);
        const expectedResult = { 
            planet_names: [mockSelectedPlanets[0].name, mockSelectedPlanets[1].name],
            vehicle_names: [mockAllVehicles[0].name, mockAllVehicles[1].name]
        }
        expect(result).toEqual(expectedResult);
    })
})