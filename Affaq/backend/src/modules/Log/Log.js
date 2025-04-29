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
}
},{ timestamps: true });
module.exports=mongoose.model("Log",logSchema);