import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators'
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
 /**
	 * getting posts by passing queryparameters
   * renaming data getting from server
	*/
export class PostServiceService {
private posts: any;
private updatedPost=new Subject<any>()

constructor(private http:HttpClient) { }
getPost(postPage:number, currentPage:number){
  const queryParams=`?pagesieze=${postPage}&page=${currentPage}`

  this.http.get<{posts:any, maxPost:number}>('http://localhost:3000/api'+queryParams)
    .pipe(map((postData)=>{
      return {post:postData.posts.map(post=>{
      return{
        title:post.title,
        content:post.content,
        id:post._id,
        productImage:post.productImage
  }
  }), maxPost:postData.maxPost}
}))

    .subscribe((transformedPosts)=>{
      this.posts= transformedPosts.post;
      this.updatedPost.next({posts:[...this.posts],postCount:transformedPosts.maxPost})
})
}
 
getUpdatPost(){
  return this.updatedPost.asObservable()
}
 /**
	 * adding posts using formData to include files
	*/
addPosts(title:string,content:string,image:File){
  const postdata= new FormData();
  postdata.append("title",title);
  postdata.append("content",content);
  postdata.append("productImage",image);

  this.http.post<any>('http://localhost:3000/api',postdata)
    .subscribe((responseData)=>{
  
  const post: Post={id:responseData._id,title:title,content:content,productImage:responseData.productImage};
    this.posts.push(post);
    this.updatedPost.next([...this.posts])
})
}
 /**
	 * deleting post by id
	*/
deletePost(id:string){
  this.http.delete('http://localhost:3000/api/'+ id)
    .subscribe(()=>{
      const deletedPosts =this.posts.filter(post=>post.id!==id)
      this.posts=deletedPosts
      this.updatedPost.next([...this.posts])
})  
}
 /**
	 * reaching to the server and getting post by id
 */
PostId(id:string){
  return this.http.get('http://localhost:3000/api/'+ id)
    }

}
