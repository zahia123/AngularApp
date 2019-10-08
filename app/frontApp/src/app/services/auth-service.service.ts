import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../models/auth-model';
import { Subject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class AuthServiceService {
private token:string;
private authStatus= new Subject<boolean>()
private isauthonticated=false

constructor(private http:HttpClient,private router:Router) { }

getToken(){
return this.token
  
}

getAuthStatus(){
return this.authStatus.asObservable()
}
getAuth(){
return this.isauthonticated
}
 /**
	 * reaching the server and getting the token
	*/

login(email:string,password:string){
  const auth:Auth ={email:email,password:password}
  this.http.post<{token:string}>("http://localhost:3000/api/user/login/",auth)
   .subscribe(response=>{
    const token=response.token
    this.token=token
    if(token){
      this.isauthonticated=true
      this.authStatus.next(true)
      this.router.navigate(['/edit'])
    }else
      this.router.navigate(['/'])
})
  }
 /**
	 * loging-out mothed
 */

logout(){
  this.token=null
  this.authStatus.next(false)
  this.isauthonticated=true
  this.router.navigate(['/'])
}
  
}
