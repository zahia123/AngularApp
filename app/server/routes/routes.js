const express = require('express');
const router = express.Router();
const post = require ('../moongo-models/model');
const mongoose =require ('mongoose');
const multer = require('multer');
const Auth = require('../middleware/middleware ')
 /**
	* using multer diskstorage
 */

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./upload/');
    },
filename:function(req,file,cb){
    cb(null,new Date().toISOString() +file.originalname);
}
})
 /**
   * using multer and passing storage as a prameter
*/

const upload = multer({storage:storage})
//
router.get('/', async(req,res)=> {
   
    try{
        const pageSieze= +req.query.pagesieze;
        const currentPage= +req.query.page;
        const postQuery=post.find();
        let fetchedData;
        if(pageSieze && currentPage){
            postQuery.skip( pageSieze * (currentPage -1) )
            .limit(pageSieze)
        }

        const postSubmited = await postQuery;
        fetchedData=postSubmited
        const count= await post.countDocuments()
        res.json({
            posts:fetchedData,
            maxPost:count
        });
    }catch(err){
        res.json({message:err})
    }
    });
     /**
	   * getting post by id
	 */
    
   
router.get('/:id',async (req,res)=> {
    try{
        const postId = await post.findById(req.params.id);
        res.json(postId);
    }catch(err){
        res.json({message:err});
    }});
     /**
	 * deleting post by id from db
	 */

 router.delete('/:id',Auth,async (req,res)=> {
    try{
        const removedId = await post.deleteOne({_id : req.params.id});
        res.json(removedId );
    }catch(err){
        res.json({message:err});
    } });

    /**
	  * posting new post to db
	*/
                       

router.post('/',Auth,upload.single('productImage'),  async(req,res)=>{
   
    const url=req.protocol + '://' +req.get("host")
    const posts = new post({
       _id: new mongoose.Types.ObjectId(),
       title: req.body.title,
       content:req.body.content,
       productImage:url + "/upload/" +req.file.filename
    });
    try{
      const savedPost= await posts.save();
      res.json(savedPost);
    }catch(err){
      res.json({massage:err});
    }
    })
 module.exports=router;