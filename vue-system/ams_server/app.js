const express=require("express");
const app=express();

const server=require("http").createServer(app);
const port="9999";
const hostname="0.0.0.0";
const connection=require("./utils/connect");
const cors=require("cors");
const path=require("path");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));




var session=require("express-session");
app.use(session({
  name:"my-exp",
  saveUninitialized:true,
  secret:"text",
  cookie:{maxAge:1000*60*20},
  resave:false
}))


// var {checkToken} = require("./utils");
// app.use(checkToken);



const vueRouter=require("./views/vue");
app.use("/vue",vueRouter);

server.listen(port,hostname,()=>{
    console.log(`my server is listening on http://${hostname}:${port}`);
})
