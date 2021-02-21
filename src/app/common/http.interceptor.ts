import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, filter, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { LoaderService } from "./loader/loader.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    
    totalServicesInProgress: number = 0;
    
    constructor(private loaderService: LoaderService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestClone = req.clone({
            url: this.prependBaseUrl(req.url),
            headers: this.appendHeaders(req.headers)
        });
        this.updateServiceCount(+1);
        
        return next.handle(requestClone).pipe(
            filter(x => x instanceof HttpResponse),
            tap(() => this.updateServiceCount(-1)),
            catchError((err, caught) => {
                this.updateServiceCount(-1);
                return caught;
            })
        );
    }

    private appendHeaders(headers: HttpHeaders): HttpHeaders {
        const additionalHeaders: { [key: string]: string } = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        for (let header in additionalHeaders) {
            headers = headers.set(header, additionalHeaders[header]);
        }
        return headers;
    }
    private prependBaseUrl(url: string): string {
        return this.isAbsoluteUrl(url) ? url : `${environment.SERVICE_BASE_URL}${url}`;
    }
    private isAbsoluteUrl(url: string): boolean {
        return url.startsWith('http');
    }
    private updateServiceCount(count: number) {
        this.totalServicesInProgress += count;
        if (this.totalServicesInProgress < 0) this.totalServicesInProgress = 0;
        this.loaderService.visible = this.totalServicesInProgress > 0;
    }
}
