import { TestBed } from "@angular/core/testing";
import { Planet } from "../models/planet.model";
import { PlanetComponent } from "./planet.component";

describe('PlanetComponent', () => {
    let component: PlanetComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                PlanetComponent
            ]
        }).compileComponents();
        component = TestBed.inject(PlanetComponent);
    });

    it('should get the correct planet image', () => {
        const planet = new Planet();
        planet.name = 'Donlon';
        planet.distance = 200;
        component.planet = planet;

        expect(component.planetImage).toBe('assets/images/planets/Donlon.png');
    });
    
    it('should function correctly on Click', () => {
        expect(component.isSelected).toBe(false);
        component.toggleChange.subscribe((value) => {
            expect(value).toBe(true);
        });
        component.onClick();
        expect(component.isSelected).toBe(true);
    });
});