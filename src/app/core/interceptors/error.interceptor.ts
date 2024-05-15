import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next:any) => {
  return next(req).do((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      // do stuff
    }
  }, (err:any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // redirect to the login route
        // or show a model
      }
    }
  }
  )
};
