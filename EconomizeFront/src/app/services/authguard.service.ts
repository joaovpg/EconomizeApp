// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { take, map, tap } from 'rxjs/operators'

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthguardService implements CanActivate {

//   constructor(private auth: AngularFireAuth, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
//     return this.auth.authState.pipe(
//       take(1),
//       map(user => !!user),
//       tap(loggedIn => {
//         if(!loggedIn) {
//           this.router.navigate(['/notAuth']);
//         }
//       })
//     )
//   }
// }
