const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "25792a200405d571faf003bbb37c53d4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
   
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            console.log(temperature);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(description);
            res.write("<h1>The temperature in " + query + " is " + temperature + " degrees Celcius with " + description + ".</h1>.")
            res.write("<div><img src=" + imageURL + "></div>");
            res.send();
        });

    });
});





app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});