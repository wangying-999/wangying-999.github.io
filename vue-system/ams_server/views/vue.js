var express = require("express");
var router = express.Router();


const {Data,User,Love}=require("../utils/schema");

router.post("/register",(req,res)=>{
    var body=req.body;
    console.log(body);
    User.findOne({
        username:body.username,
    }).then(result=>{
        if(result){
            res.json({
                msg:"手机号已经被注册,请重新注册",
                code:200,
                flag:0, 
               
            })
        }else{
            Love.updateOne({
                name:"user"
            },{
                $inc:{
                    id:1
                }
            }).then(result=>{
               Love.findOne({
                   name:"user"
               }).then(result=>{
                   body.id=result.id;
                   User.insertMany(body).then(result=>{
                       res.json({
                        msg:"注册成功...",
                        code:200,
                        flag:1,
                        
                       })
                   })
               })
            })
        }
    })
})



router.post("/login",(req,res)=>{
    var body = req.body;
    console.log(body);
    
        User.findOne({
            username:body.username
        }).then(result=>{
            if(result){
                
                if(result.password == body.password){
                    req.session.username = result.username;
                    console.log(req.session)                
                    res.json({
                        msg:"验证通过,登录成功",
                        code:200,
                        flag:1,
                                             
                    });

                }else{
                    res.json({
                        msg:"账号或者密码错误,请重新登录",
                        code:200,
                        flag:0
                    })
                }
            }else{
                res.json({
                    msg:"账号不存在,请重新登录",
                    code:200,
                    flag:0
                })
            }
        })
   
  
})



router.get("/data",(req,res)=>{
    Data.find({},{}).then(result=>{
        res.json({
            msg:"获取基本信息成功",
            result,
            code:200
        })
    })
})


router.post("/delect",(req,res)=>{
    var body=req.body;
    Data.deleteOne({
        id:body.id
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"删除数据成功",
           
        })
    })
})

router.post("/editone",(req,res)=>{
    var body=req.body;
    console.body;
    Data.updateOne({
        id:body.id
    },{
        $set:{
            assetname:body.assetname,
            model:body.model,
            standard:body.standard,
            buydata:body.buydata
        }
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"修改数据成功",
          
        })
    })

})


router.post("/edittwo",(req,res)=>{
    var body=req.body;
    console.body;
    Data.updateOne({
        id:body.id
    },{
        $set:{
            assetname:body.assetname,
            price:body.price,
            number:body.number,
            allprice:body.allprice
        }
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"修改数据成功",
          
        })
    })

})



router.post("/editthree",(req,res)=>{
    var body=req.body;
    console.body;
    Data.updateOne({
        id:body.id
    },{
        $set:{
            assetname:body.assetname,
            adminunit:body.adminunit,
            useunit:body.useunit,
            admin:body.admin,
            usedata:body.usedata
        }
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"修改数据成功",
          
        })
    })

})


router.post("/editfour",(req,res)=>{
    var body=req.body;
    console.body;
    Data.updateOne({
        id:body.id
    },{
        $set:{
            assetname:body.assetname,
            place:body.place,
            equse:body.equse,
            brand:body.brand,
        }
    }).then(result=>{
        res.json({
            code:200,
            result,
            msg:"修改数据成功",
          
        })
    })

})

router.post("/alldelect",(req,res)=>{
    var body=req.body;
    console.log(body);
   
        if(req.session.username=="wyadmin"){
                Data.deleteMany({
                id:body
            }).then(result=>{
                res.json({
                    code:200,
                    result,
                    msg:"删除数据成功",
                    flag:1
                
                })
            })
        }else{
            res.json({
                code:200,
                msg:"您不是管理员,无法操作",
                flag:0,
            })
        }
        
    
})

router.post("/insert",(req,res)=>{
    var body=req.body;
    Data.findOne({
        id:body.id
    }).then(result=>{
        if(result){
            res.json({
                msg:"编号已使用,请重新填写",
                code:200,
                flag:0             
            })
        }else{
            Data.insertMany(body).then(result=>{
                res.json({
                    msg:"添加成功",
                    code:200,
                    result,
                    flag:1
                })
            })
        }
    })
 
})


router.post("/changepwd",(req,res)=>{
    var body=req.body;
    console.log(body);
    User.updateOne({
        username:body.username
    },{
        $set:{
            password:body.password
        }
    }).then(result=>{
        res.json({
            code:200,
            msg:"密码修改成功"
        })
    })
})


router.post("/person",(req,res)=>{
    var body=req.body;
    User.updateMany({username:body.username},{
        $set:{
            name:body.name,
            weixin:body.weixin,
            phone:body.phone,
            age:body.age,
            type:body.type,
            sign:body.sign
        }
    }).then(result=>{
        res.json({
            msg:"提交成功",
            code:200,
            result,
            flag:1
        })
    })
})

router.post("/everydata",(req,res)=>{
    var body=req.body;
    User.findOne({
        username:body.username
    }).then(result=>{
        res.json({
            msg:'查询成功',
            code:200,
            result
        })
    })
})



const multer=require("multer");
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/avatar')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'wang'+file.originalname);
    }
})

var upload=multer({storage:storage}).any()

router.post("/uploadpic",upload,(req,res)=>{
    console.log(req.session.username);
    var path=req.files[0].path;
   
  
        User.updateOne({
            username:req.session.username
        },{
            $set:{
                pic:path
            }
        }).then(result=>{
                    res.json({
                    msg:"头像上传成功...",
                    pic:path,
                    result
                })
        })
    
    
   
})

router.post("/getavatar",(req,res)=>{
    var body=req.body;
        User.findOne({
            username:req.session.username
        }).then(result=>{
            if(result.pic){
                res.json({
                    code:200,
                    msg:"获取头像成功",
                    result,
                    flag:1

                })
            }else{
                res.json({
                    code:200,
                    msg:"获取头像失败",
                    flag:0
                })
            }
        })
    
})


module.exports = router;