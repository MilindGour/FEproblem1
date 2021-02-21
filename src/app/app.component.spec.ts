import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { AppComponent } from './app.component';

const eventSubject = new Subject<NavigationEnd>();

const mockNavigationEnd: NavigationEnd = {
    id: 1,
    url: '/home',
    urlAfterRedirects: '/home'
};

class MockRouter {
    events = eventSubject.asObservable();
}

describe('AppComponent', () => {
    let component: AppComponent;
    let subscription: Subscription;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AppComponent,
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();

        component = TestBed.inject(AppComponent);
        router = TestBed.inject(Router);
    })

    afterEach(() => {
        if (subscription && !subscription.closed) subscription.unsubscribe();
    })

    it('should hide header footer if current route is /home', (done) => {
        subscription = component.headerFooterVisible$.subscribe(x => {
            expect(x).toBe(false);
            done();
        });
        eventSubject.next(new NavigationEnd(0, '/home', '/home'));
    })

    it('should show header footer when route is NOT /home', (done) => {
        subscription = component.headerFooterVisible$.subscribe(x => {
            expect(x).toBe(true);
            done();
        });
        eventSubject.next(new NavigationEnd(0, '/test', '/test'));
    })
});
