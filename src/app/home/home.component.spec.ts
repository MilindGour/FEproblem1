import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { HomeComponent } from "./home.component"

class MockRouter {
    navigate() {
        // mock method
    }
}

describe('HomeComponent', () => {
    let component: HomeComponent;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                HomeComponent,
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        component = TestBed.inject(HomeComponent);
        router = TestBed.inject(Router);
    })

    it('should call the route on click of start mission', () => {
        const spy = spyOn(router, "navigate").and.callThrough();
        component.startMissionClicked();
        expect(spy).toHaveBeenCalledWith(['select-planets']);
    });
})