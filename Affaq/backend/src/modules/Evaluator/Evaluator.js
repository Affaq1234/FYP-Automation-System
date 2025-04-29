const mongoose=require("mongoose");
const evaluatorSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{ timestamps: true });
module.exports=mongoose.model("Evaluator",evaluatorSchema);