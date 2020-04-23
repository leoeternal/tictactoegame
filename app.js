var express=require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

var app=express();

var User=require("./model/user");
var Room=require("./model/room");

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

mongoose.connect("mongodb+srv://nikhil:nikhil@cluster0-8jb9b.mongodb.net/test?retryWrites=true&w=majority");

app.get("/",function(req,res){
    var status=true;
    res.render("nameDisplay",{status:true});
})



app.post("/create/user",function(req,res){
    var status=true;
    User.find({},function(err,alluser){
        if(err)
        {
            return console.log(err);
        }
        else
        {
            for(var i=0;i<alluser.length;i++)
            {
                if(alluser[i].username == req.body.username)
                {
                    status=false;
                    break;
                }
            }
            if(status==false)
            {
                res.render("nameDisplay",{message:"Username already taken",status:status});
            }
            else
            {
                User.create({username:req.body.username},function(err,userCreated){
                    if(err)
                    {
                        return console.log(err);
                    }
                    else
                    {
                        res.render("roomdisplay",{userCreated:userCreated,statusroom:true});
                    }
                })
            }
        }
    })
})



app.post("/create/room/:id/:name",function(req,res){
    var userone={
        id:req.params.id,
        username:req.params.name
    }
    var statusroom=true;
    Room.find({},function(err,allroom){
        if(err)
        {
            return console.log(err);
        }
        else
        {
            for(var i=0;i<allroom.length;i++)
            {
                if(allroom[i].roomname == req.body.roomname)
                {
                    statusroom=false;
                    break;
                }
            }
            if(statusroom==false)
            {
                User.findById({_id:userone.id},function(err,userCreated){
                    if(err)
                    {
                        return console.log(err);
                    }
                    else
                    {
                        res.render("roomdisplay",{message:"Roomname already taken",statusroom:statusroom,userCreated:userCreated});
                    }
                })
            }
            else
            {
                Room.create({roomname:req.body.roomname,userone:userone,useroneCount:1},function(err,roomCreated){
                    if(err)
                    {
                        return console.log(err);
                    }
                    else
                    {
                        res.render("room",{roomCreated:roomCreated});
                    }
                })
            }
        }
    })
})



app.post("/join/room/:id/:name",function(req,res){
    var usertwo={
        id:req.params.id,
        username:req.params.name
    }
    Room.findOneAndUpdate({roomname:req.body.roomname},{$set: {usertwoCount:1,usertwo:usertwo}},function(err,roomCreated){
        if(err)
        {
            return console.log(err);
        }
        else
        {
            
            if(roomCreated==null)
            {
                User.findById({_id:req.params.id},function(err,userCreated){
                    if(err)
                    {
                        return console.log(err);
                    }
                    else
                    {
                        res.render("roomdisplay",{message:"No room found with this name",statusroom:false,userCreated:userCreated});
                    }
                })
            }
            else if(roomCreated.usertwoCount==1)
            {
                User.findById({_id:req.params.id},function(err,userCreated){
                    if(err)
                    {
                        return console.log(err);
                    }
                    else
                    {
                        res.render("roomdisplay",{message:"Already two people playing in this room",statusroom:false,userCreated:userCreated});
                    }
                })
            }
            else
            {
            roomCreated.usertwo=usertwo;
            roomCreated.usertwoCount=1;
            res.render("room",{roomCreated:roomCreated});

            }
       }
    })
})



app.listen(process.env.PORT||3000,function(){
    console.log("server has started");
})
