import { Component, Input, OnInit } from "@angular/core";
import { Vehicle } from "../models/vehicle.model";
import { VehicleDraggableComponent } from "../vehicle-draggable/vehicle-draggable.component";

@Component({
    selector: 'app-vehicle-drag-container',
    styleUrls: ['./vehicle-drag-container.component.scss'],
    templateUrl: './vehicle-drag-container.component.html'
})
export class VehicleDragContainerComponent implements OnInit {
    @Input() vehicles!: Vehicle[];
    name!: string;
    speed!: number;
    max_distance!: number;

    ngOnInit() {
        this.name = this.vehicles[0].name;
        this.speed = this.vehicles[0].speed;
        this.max_distance = this.vehicles[0].max_distance;
    }
}