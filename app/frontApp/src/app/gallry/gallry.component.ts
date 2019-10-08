import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs'
import {Post} from '../models/post.model';
import {Router,ActivatedRoute} from '@angular/router'
import {PageEvent} from '@angular/material'
import {PostServiceService} from '../services/post-service.service'



@Component({
  selector: 'app-gallry',
  templateUrl: './gallry.component.html',
  styleUrls: ['./gallry.component.css']
})
export class GallryComponent implements OnInit,OnDestroy {
  isLaoding=true
  posts:any
  postpages=0
  pageSize=6
  currentPage=1
  private subscription:Subscription
constructor(private postServive:PostServiceService, private router:Router,private _route:ActivatedRoute) {
    }
 /**
	 * getting posts and nuber of posts
	 */
ngOnInit() {
  window.scroll(0,0)
  
  this.postServive.getPost(this.pageSize,this.currentPage)
  this.subscription=this.postServive.getUpdatPost().subscribe((postData:{posts:Post[],postCount:number})=>{
  this.postpages=postData.postCount;
  this.posts=postData.posts
  this.isLaoding=false
  })
 }
  /**
	 * onclick page navigate by post
	 */
 
onClick(id:string){
  this.router.navigate(['/items',id])
   }
    /**
	 * passing pagesize and currentpage when user change pagess
	 */

onchange(pagedata:PageEvent){
  this.currentPage=pagedata.pageIndex +1
  this.postServive.getPost(this.pageSize,this.currentPage)
  }
 
ngOnDestroy(){
  this.subscription.unsubscribe()
  }
}
