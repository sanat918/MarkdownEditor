let express=require('express')
let bodyParse=require('body-parser')
const cors = require("cors");
let markdown=require('markdown-it');
let app=express()

require('dotenv').config()
app.use("*",cors());
app.use(express.text());

let port=process.env.PORT


let md = new markdown();

app.post('/',(req,res)=>{
     let str=req.body.text
     console.log("MArkdownText",req.body)
    res.send( md.render(req.body))
})


app.listen(port,()=>{
    console.log('App is running on port', `${port}`)
})