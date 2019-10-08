import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import {Router,ActivatedRoute} from '@angular/router'
import {PostServiceService} from '../services/post-service.service'


@Component({
selector: 'app-items',
templateUrl: './items.component.html',
styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    private subscription:Subscription
    posts={
        title:'mytitle',
        content:'mycontent',
        productImage:'/assets/images/logo.jpg'
}
constructor(private postServive:PostServiceService, private router:Router,private _route:ActivatedRoute) { }
 /**
   * getting snapshot of post id
   * passing the post id to PostId
   * getting the post by id
*/
ngOnInit() {
    window.scroll(0,0)
    const id=this._route.snapshot.params['id']
    this.postServive.PostId(id)
    this.subscription=this.postServive.PostId(id).subscribe((posts:any)=>{
    this.posts=posts
    })

}

ngOnDestroy(){
   this.subscription.unsubscribe();
}
}
