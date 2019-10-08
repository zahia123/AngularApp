import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EnrollmentService} from '../services/enrollment.service'
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  registerForm: FormGroup
  isLaoding=true
  
  constructor(private formBuilder: FormBuilder,private enrollmentService:EnrollmentService) { }

  ngOnInit() {
    window.scroll(0,0)
    this.registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    text:['', Validators.required],
    email:['', [Validators.required, Validators.email]]
     })
     this.isLaoding=false
  }
/**
	 * submit users informations
	 */
  onSubmit() {
    this.isLaoding=true
    this.enrollmentService.sendEmail(this.registerForm.value)
    .subscribe(
      response=> console.log('success',response),
      error=> console.log('error',error)
    
    )
  
    this.registerForm.reset()
    this.isLaoding=false
  }
  get firstName() { return this.registerForm.get('firstName') }
  get email() { return this.registerForm.get('email') }
  get text() { return this.registerForm.get('text') }
  }
