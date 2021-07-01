
import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/do';
import { Observable} from "rxjs";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === "True") {
      return next.handle(req.clone());
    }

    if (localStorage.getItem('userAccessToken') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userAccessToken'))
      });
      return next.handle(clonedreq)
        .do(
          succ => { },
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('/login');
            }
          }
        );
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}


