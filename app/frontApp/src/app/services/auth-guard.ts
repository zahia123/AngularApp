import { CanActivate, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGard implements CanActivate{
constructor(private authService: AuthServiceService,private router: Router ){}

canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean |Observable<boolean> 
|Promise<boolean>{
    const isAuth=this.authService.getAuth()
    if(!isAuth){
    this.router.navigate(['/'])
    }
    return isAuth
}  

}