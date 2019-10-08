import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
 /**
	 * sending user email, message to the server
	*/
export class EnrollmentService {
//reaching the server and sending user email,message
  url='http://localhost:3000/sendmail';
  constructor(private _http:HttpClient) { }
  sendEmail(userData){
  return this._http.post<any>(this.url,userData)
  }
}
