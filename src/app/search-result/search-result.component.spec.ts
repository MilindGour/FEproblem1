import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { SearchResult, SearchResultComponent } from "./search-result.component"

class MockRouter {
    navigate(toWhat: any) {
        toWhat;
    }
}
const mockSearchResult: SearchResult = {
    found: true,
    planetName: 'Mock planet',
    timeTaken: 10
};

class MockWindow {
    history = {
        state: {
            searchResult: mockSearchResult
        }
    };
}

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                SearchResultComponent,
                { provide: Router, useClass: MockRouter }
            ]
        }).compileComponents();
        component = TestBed.inject(SearchResultComponent);
        router = TestBed.inject(Router);
    })

    it('should read from history.state on navigation', () => {
        
        const mockState = {
            searchResult: mockSearchResult
        };
        
        Object.defineProperty(history, 'state', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: mockState
        });

        component.ngOnInit();
        
        expect(component.searchResult).toBe(mockSearchResult);
    })

    it('should call onStartOverClicked when no search results are supplied', () => {

        const mockState = {};

        Object.defineProperty(history, 'state', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: mockState
        });

        const spy = spyOn(component, 'onStartOverClicked').and.callThrough();
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    })

    it('should call router.navigate on click on startOver', () => {
        const spy = spyOn(router, 'navigate').and.callThrough();
        component.onStartOverClicked();
        expect(spy).toHaveBeenCalledWith(['/home']);
    })
})