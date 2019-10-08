import {HttpInterceptor, HttpRequest, HttpHandler} from "@angular/common/http"
import { Injectable } from '@angular/core'
import { AuthServiceService } from '../auth-service.service'

@Injectable()
 /**
	* intercepting the request and adding the token to http header
 */
    export class  Interceptor implements HttpInterceptor{
    constructor(private authService:AuthServiceService){}

intercept(req:HttpRequest<any>,next:HttpHandler){
    const Token =this.authService.getToken()
    const Request=req.clone({
      headers:req.headers.set("authorization","Bearer " + Token)
    })
    return next.handle(Request)
}
}