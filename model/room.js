var mongoose=require("mongoose");

var roomSchema=new mongoose.Schema({
    roomname:{
        type:String
    },
    userone:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        score:{
            type:Number,
            default:0
        }
    },
    useroneCount:{
        type:Number,
        default:0
    },
    usertwo:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        score:{
            type:Number,
            default:0
        }
    },
    usertwoCount:{
        type:Number,
        default:0
    }
});

var Room=mongoose.model("Room",roomSchema);

module.exports=Room;