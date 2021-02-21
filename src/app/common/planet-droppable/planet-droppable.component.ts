import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PlanetDroppable } from "../models/planet-droppable.model";
import { Planet } from "../models/planet.model";
import { Vehicle } from "../models/vehicle.model";

@Component({
    selector: 'app-planet-droppable',
    styleUrls: ['./planet-droppable.component.scss'],
    templateUrl: './planet-droppable.component.html'
})
export class PlanetDroppableComponent {
    @Input() planetDroppable!: PlanetDroppable;
    @Output() selectionComplete = new EventEmitter<[Planet, Vehicle]>();
    dropListData: Vehicle[] = [];

    get planetImage() {
        return `assets/images/planets/${this.planetDroppable?.planet?.name}.png`;
    }

    drop(event: CdkDragDrop<any>) {
        if (this.dropListData.length === 0) {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            
            const eventData: [Planet, Vehicle] = [ this.planetDroppable.planet!, this.dropListData[0] ];
            this.selectionComplete.emit(eventData);
        }
    }
}