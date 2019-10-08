import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
constructor(private authService:AuthServiceService) { }

ngOnInit() {
}

onlogin(form:NgForm){
  if(form.invalid){
  return
  }
  this.authService.login(form.value.email,form.value.password)
  }
}
