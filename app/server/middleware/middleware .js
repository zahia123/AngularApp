const jwt=require('jsonwebtoken')
 /**
   * creating middleware to validate user request
 */

module.exports=(req,res,next)=>{
try{
    const token= req.headers.authorization.split(" ")[1];
    jwt.verify(token,"qwertyuiokj")
    next()
}catch(error){
    res.status(401).json({message:"auth failed"})
}
}