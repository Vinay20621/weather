const express = require("express");
const router=express.Router()
const request = require('request');
require('dotenv').config()
const URL= process.env.URL



router.get('/weather',function (req,res) {
   
    // home page(default varanasi)
    
    var city='varanasi'
    if(req.query.city)
    {
        city=req.query.city;
    }
    var url=URL.replace("${city}",city)
    
    request(url, function (error, respone, body) {
        var weather_json = JSON.parse(body);
       
        
        
        
        if (!weather_json.message)
        {
            var datetime = new Date().toDateString();
            var cel = ((Math.round(weather_json.main.temp) - 32) * 5) / 9;
                
            var data = {
                city: weather_json.name,
                temp: Math.round(weather_json.main.temp),
                icon: weather_json.weather[0].icon,
                des: weather_json.weather[0].description,
                humi: weather_json.main.humidity,
                country : weather_json.sys.country,
                wind: weather_json.wind.speed,
                temp_max: weather_json.main.temp_max,
                pressure: weather_json.main.pressure,
                date: datetime

            }
            var data = { data: data }
            res.render('index', data);
        }else{
            
            res.render('index', { data : "city not found" });
        }


    });

});



router.post('/weather', (req,res)=>{
    var city  = req.body.city;
    res.redirect('/weather'+'?city='+city);
})

// converting to celsius
router.get('/weather/cel', function (req, res) {
    var city = req.query.city;
   
    // replace by city    
    var url=URL.replace("${city}",city)
    request(url, function (error, respone, body) {
        var weather_json = JSON.parse(body);
        //console.log(weather_json);       

        if (!weather_json.message) {
            var datetime = new Date().toDateString();
            var cel = ((Math.round(weather_json.main.temp) - 32) * 5) / 9;
            var max = ((Math.round(weather_json.main.temp_max) - 32) * 5) / 9;
            var km = ((weather_json.wind.speed) * 1.6093440)
            var kmp = km.toFixed(3);

            var data = {
                city: weather_json.name,
                temp: Math.round(cel),
                icon: weather_json.weather[0].icon,
                des: weather_json.weather[0].description,
                humi: weather_json.main.humidity,
                country: weather_json.sys.country,
                wind: kmp,
                temp_max: Math.round(max),
                pressure: weather_json.main.pressure,
                date: datetime,
                cel : "yes"

            }
            var data = { data: data }
            res.render('index', data);
        } else {
            res.render('index', { data: "city not found" });

        }


    });

});

module.exports=router