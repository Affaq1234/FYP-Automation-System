const mongoose=require("mongoose");
const logSchema=mongoose.Schema({
userId:{
    type:String,
    required:true
},
action:{
    type:String,
    requied:true
},
message:{
    type:String,
    required:true
},
createdAt:{
    type:Date,
    required:true
}
});
module.exports=mongoose.model("Log",logSchema);