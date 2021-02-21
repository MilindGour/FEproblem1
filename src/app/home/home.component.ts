import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-home',
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router) {}

    startMissionClicked(): void {
        this.router.navigate(['select-planets']);
    }
}