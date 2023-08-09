var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const request  = require('request');
const home=require('./Router/home')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.json());
require('dotenv').config()
const PORT=process.env.PORT


app.use("/",home);



// port to run
app.listen(PORT || 8000 ,()=>
{
    console.log(`Your Server is running on PORT ${PORT}`)
})

