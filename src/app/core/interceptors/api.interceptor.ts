import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, catchError, map, of, takeUntil, tap, throwError } from 'rxjs';
import { HttpCancelService } from '../services/master/httpcancel.service';
import { StorageService } from '../services/master/storage.service';
import { Injectable } from '@angular/core';

@Injectable()

export class APIInterceptor implements HttpInterceptor {
  token: any;

  constructor( private router: Router, private storage: StorageService,
    private httpCancelService: HttpCancelService) {
    router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests();
      }
    });
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      if (!this.router.url.includes("/public"))
        this.router.navigateByUrl(`/`);
      return of(err.message); 
    }
    return throwError(err);
  }

  private dataHandler(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // console.log("event--->>>", event);
    }
    return event;
  }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var authReq;
    this.token = this.storage.get('listoken');
    this.token = this.token?.token;
    this.token = 'testing ..........'
    
    if (this.token != undefined || null) {
      authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.token
        }),
      });
      return next.handle(authReq).pipe(
        tap((x) => this.dataHandler(x)),
        catchError((x) => this.handleAuthError(x)),
        takeUntil(this.httpCancelService.onCancelPendingRequests())
      );
    } else {
      const authReq = req.clone({});
      return next
        .handle(authReq)
        .pipe(
          catchError((x) => this.handleAuthError(x)),
          takeUntil(this.httpCancelService.onCancelPendingRequests())
        );
    }


  }
 
}