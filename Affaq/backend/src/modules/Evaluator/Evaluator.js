const mongoose=require("mongoose");
const evaluatorSchema=mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model("Evaluator",evaluatorSchema);