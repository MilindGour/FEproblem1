import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { TestBed } from "@angular/core/testing";
import { PlanetDroppable } from "../models/planet-droppable.model";
import { Planet } from "../models/planet.model";
import { Vehicle } from "../models/vehicle.model";
import { PlanetDroppableComponent } from "./planet-droppable.component";

describe('PlanetDroppableComponent', () => {
    let component: PlanetDroppableComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                PlanetDroppableComponent
            ]
        }).compileComponents();
        component = TestBed.inject(PlanetDroppableComponent);
    });

    it('should set the correct value of planetImage', () => {
        const planetDroppable: PlanetDroppable = {
            id: '',
            planet: {
                name: 'Donlon',
                distance: 0
            }
        };
        component.planetDroppable = planetDroppable;
        expect(component.planetImage).toBe('assets/images/planets/Donlon.png');
    });

    it('should behave correctly on drop event', () => {
        const eventData: any = {
            container: { data: [0, 1] },
            previousContainer: { data: [2, 3] },
            previousIndex: 0,
            currentIndex: 0
        };
        const mockPlanet: Planet = { name: 'Donlon', distance: 0 };
        const mockVehicle: Vehicle = { name: 'Space pod', max_distance: 200, speed: 5, total_no: 2 };
        const planetDroppable: PlanetDroppable = {
            id: '',
            planet: mockPlanet
        };
        expect(component.dropListData).toHaveSize(0);
        component.dropListData = [mockVehicle];
        component.planetDroppable = planetDroppable;
        component.selectionComplete.subscribe((x) => {
            expect(x).toBe([mockPlanet, mockVehicle]);
        });
        component.drop(eventData);
    });
});