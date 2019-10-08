const mongoose = require ('mongoose');
const modeSchema = mongoose.Schema({
   _id:mongoose.Schema.Types.ObjectId,
   title:String,
   content:String,
   productImage:String,
   date: {default :Date.now,type :Date}
});
module.exports= mongoose.model('post',modeSchema);
