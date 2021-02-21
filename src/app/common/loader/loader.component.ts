import { Component } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
    selector: 'app-loader',
    styleUrls: ['./loader.component.scss'],
    template: `
        <section class="loader-container description" *ngIf="loaderService.visible"><span>Loading...</span></section>
    `
})
export class LoaderComponent {
    constructor(public loaderService: LoaderService) { }
}