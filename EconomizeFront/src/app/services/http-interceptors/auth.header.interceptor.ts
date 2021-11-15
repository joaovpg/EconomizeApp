// import { Injectable, Injector } from "@angular/core";
// import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http"
// import { Observable } from "rxjs";
// import { UserModel } from "src/app/models/user.model";
// import { AuthenticationService } from "../authentication.service";
// import { LoginComponent } from "src/app/components/public/home/login/login.component";

// @Injectable()

// export class AuthHeaderInterceptor implements HttpInterceptor {

//     user: UserModel = new UserModel;

//     constructor(private injector: Injector) { }

//     intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<any> {
//         const loginService = this.injector.get(LoginComponent)

//         if (loginService.requestLogin()) {
//             const authToken = '';
//             const authRequest = httpRequest.clone({
//                 setHeaders: { Authorization: `Bearer ${authToken}` }
//             })
//             return next.handle(authRequest);
//         } else {
//             return next.handle(httpRequest);
//         }
//     }
// }