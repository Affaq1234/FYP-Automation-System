const mongoose=require("mongoose");
const evaluationSchema=new mongoose.Schema({
evaluatorId:{
    type:String,
    required:true
},
groupId:{
    type:String,
    required:true
},
evaluationType:{
    type:String,
    required:true
},
status:{
    type:String,
    required:true
},
totalScore:{
    type:Number,
    required:true
},
obtainedScore:{
    type:Number,
    required:true
},
feedback:{
    type:String,
    required:true
}
},{ timestamps: true });
module.exports=mongoose.model("Evaluation",evaluationSchema);