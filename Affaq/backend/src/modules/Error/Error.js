const mongoose=require("mongoose");
const errorSchema=mongoose.Schema({
errorCode:{
    type:String,
    required:true
},
errorMessage:{
    type:String,
    required:true
},
userId:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    required:true
}
});
module.exports=mongoose.model("Error",errorSchema);