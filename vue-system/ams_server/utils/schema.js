var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var data_schema  = new Schema({
    id:String,
    assetname:String,
    model:String,
    standard:String,
    buydata:String,
    price:String,
    number:String,
    allprice:String,
    usedata:String,
    adminunit:String,
    useunit:String,
    admin:String,
    place:String,
    equse:String,
    brand:String
})

exports.Data= mongoose.model("data",data_schema)

var user_schema=new Schema({
    username:String,
    password:String,
    id:Number,
    name:String,
    weixin:String,
    phone:String,
    age:String,
    type:String,
    sign:String,
    pic:String
})

exports.User=mongoose.model("user",user_schema);

var love_schema  = new Schema({
    name:String,
    id:Number
})

exports.Love = mongoose.model("love",love_schema)