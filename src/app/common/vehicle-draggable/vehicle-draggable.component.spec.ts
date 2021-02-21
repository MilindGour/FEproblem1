import { TestBed } from "@angular/core/testing"
import { VehicleDraggableComponent } from "./vehicle-draggable.component"

describe('VehicleDraggableComponent', () => {
    let component: VehicleDraggableComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                VehicleDraggableComponent
            ]
        }).compileComponents();
        component = TestBed.inject(VehicleDraggableComponent);
    });

    it('should set the correct value of vehicleImage', () => {
        component.name = 'Space pod';
        expect(component.vehicleImage).toBe('assets/images/vehicles/space_pod.png');
    });
})