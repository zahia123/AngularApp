import { Component, OnInit,OnDestroy } from '@angular/core';
import {Post} from '../models/post.model';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material';
import {PostServiceService} from '../services/post-service.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';


@Component({
selector: 'app-edit',
templateUrl: './edit.component.html',
styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnDestroy {
  selectedfile:File=null
  imageUrl:String= "/assets/images/moumen17.jpg"
  posts:Post[]=[]
  postpages=0
  pageSize=9
  currentPage=1
  isLaoding=true
  private subscription:Subscription
constructor(private postServive:PostServiceService,private router:Router,private authService:AuthServiceService) { }
/**
	 * getting posts and number of posts
	 */
ngOnInit() {
  window.scroll(0,0)
  this.postServive.getPost(this.pageSize,this.currentPage)
  this.subscription=this.postServive.getUpdatPost().subscribe((postData:{posts:Post[],postCount:number})=>{
  this.postpages=postData.postCount
    this.posts=postData.posts
    this.isLaoding=false
       })
  }

onImageUploded(file:FileList){
  this.selectedfile=file.item(0)
  const reader= new FileReader()
  reader.onload=(event:any)=>{
  this.imageUrl= event.target.result
}
  reader.readAsDataURL(this.selectedfile)
}
/**
	 * passing pagesize and currentpage when user change pages
 */

onchange(pagedata:PageEvent){
  this.currentPage=pagedata.pageIndex +1
  this.postServive.getPost(this.pageSize,this.currentPage)
}

onAddPost(form:NgForm,image){
  
  if(form.invalid){
  return;
    }
    /**
	 * adding posts and images
	 */
    
  this.postServive.addPosts(form.value.title,form.value.content,this.selectedfile)
  image.value=null
  form.resetForm();

}
 /**
	 * deleting post by id
	 */

onDelete(id:string){
  this.postServive.deletePost(id)
  this.router.navigate(['/edit'])
}

ngOnDestroy(){
  this.subscription.unsubscribe()
  
}
onLogout(){
  this.authService.logout()
}
}