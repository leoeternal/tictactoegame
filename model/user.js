var mongoose=require("mongoose");

var userSchema=new mongoose.Schema({
    username:{
        type:String
    },
    score:{
        type:Number,
        default:0
    }
});

var User=mongoose.model("User",userSchema);

module.exports=User;