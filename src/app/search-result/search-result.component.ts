import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-search-result',
    styleUrls: ['./search-result.component.scss'],
    templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
    searchResult!: SearchResult;

    constructor(private router: Router) {}
    
    ngOnInit() {
        this.searchResult = history.state.searchResult;
        if (!this.searchResult) {
            this.onStartOverClicked();
        }
    }

    onStartOverClicked() {
        this.router.navigate(['/home']);
    }
}

export class SearchResult {
    found!: boolean;
    planetName?: string;
    timeTaken?: number;
}