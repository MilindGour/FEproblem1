import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-vehicle-draggable',
    styleUrls: ['./vehicle-draggable.component.scss'],
    templateUrl: './vehicle-draggable.component.html'
})
export class VehicleDraggableComponent {
    @Input() name?: string;
    @Input() id: number = -1;

    get vehicleImage() {
        const normalizedName = this.name?.toLowerCase().replace(/ /g, '_') + '.png';
        return `assets/images/vehicles/${normalizedName}`;
    }
}