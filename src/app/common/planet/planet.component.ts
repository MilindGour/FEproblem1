import { Component, HostListener, Input, Output, EventEmitter } from "@angular/core";
import { Planet } from "../models/planet.model";

@Component({
    selector: 'app-planet',
    styleUrls: ['./planet.component.scss'],
    templateUrl: './planet.component.html'
})
export class PlanetComponent {
    @Input() planet!: Planet;
    @Input() isDisabled: boolean = false;
    @Output() toggleChange = new EventEmitter<boolean>();
    
    get planetImage() {
        return `assets/images/planets/${this.planet.name}.png`;
    }

    isSelected: boolean = false;

    // @HostListener('click')
    onClick() {
        if (!this.isDisabled || this.isSelected) {
            this.isSelected = !this.isSelected;
            this.toggleChange.emit(this.isSelected);
        }
    }
}