import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  headerFooterVisible$ = this.router.events.pipe(
    filter(x => x instanceof NavigationEnd),
    map((x: any) => x.urlAfterRedirects !== '/home')
  );

  constructor(private router: Router) { }
}
