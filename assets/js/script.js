//VARIABLES
var searchBoxLoc = "";
var cityName = "";
var country = "";
var date = "";


//FUNCTIONALITY TO PICK A DATE FROM A CALENDAR
$(function(){
    $( "#date-pick").datepicker({minDate: 0, maxDate: "+7D"});
    date = $("#date-pick").val();
    console.log(date);
});

//--FIRST fetch the co-ordinates based on the name of the location
function cityNameWeatherFetch() {

    //DUMMY CITY NAME TO BE REPLACED WITH USER ENTRY FROM TEXT BOX
    searchBoxLoc = "Edison";
    //DUMMY CITY NAME ENDS

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchBoxLoc + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    //extract the city name and country from this first API
                    cityName = data.name;
                    country = data.sys.country;
                    //push the coords into a new function to get a more complete API
                    coordWeatherFetch(data.coord.lon, data.coord.lat);
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};

//--THEN a fetch to a different API using the co-ordinates of the named location. Returns a more complete weather profile
function coordWeatherFetch(long, lati) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data to be sent for processing
            if (response.ok) {

                response.json().then(function (data) {
                    //send the data to be rendered in HTML
                    renderWeatherData(data);
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};

//--LAST renders the weather data for the given location on a given date to the correct HTML container
function renderWeatherData(data) {

    console.log(data);

    //insert the city name and country as well as an icon depicting the weather conditions
    var cityNameContainerEl = $("<h2>")
        .text("City of: " + cityName + ", " + country + " ( + dateHandler(0) + )");
    var currentWeatherIcon = data.current.weather;
    currentWeatherIconEl = $("<img>")
        .attr("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon[0].icon + "@2x.png");
    $("#cityname-header").append(cityNameContainerEl).append(currentWeatherIconEl);


    //TEMPERATURE
    var temperature = $("<span>")
        .text("Current temp: " + data.current.temp + "°F");
    $("#temperature").append(temperature);

    //WINDSPEED
    var windSpeed = $("<span>")
        .text("Wind Speed: " + data.current.wind_speed + " MPH");
    $("#wind-speed").append(windSpeed);

    //HUMIDITY
    var humidity = $("<span>")
        .text("Humidity: " + data.current.humidity + "%");
    $("#humidity").append(humidity);

    //UV INDEX WITH DIFFERENT TEXT COLORS BASED ON SEVERITY
    if (data.current.uvi <= 2) {
        var uvIndex = $("<span>")
            .addClass("text-success bg-dark")
            .text("UV Index: " + data.current.uvi);
        $("#uvindex").append(uvIndex);
    }

    else if (data.current.uvi <= 5 && data.current.uvi > 2) {
        var uvIndex = $("<span>")
            .addClass("text-warning bg-dark")
            .text("UV Index: " + data.current.uvi);
        $("#uvindex").append(uvIndex);
    }

    else if (data.current.uvi <= 7 && data.current.uvi > 5) {
        var uvIndex = $("<span>")
            .addClass("text-orange bg-dark")
            .text("UV Index: " + data.current.uvi);
        $("#uvindex").append(uvIndex);
    }

    else if (data.current.uvi <= 10 && data.current.uvi > 7) {
        var uvIndex = $("<span>")
            .addClass("text-danger bg-dark")
            .text("UV Index: " + data.current.uvi);
        $("#uvindex").append(uvIndex);
    }

    else {
        var uvIndex = $("<span>")
            .addClass("text-violet bg-dark")
            .text("UV Index: " + data.current.uvi);
        $("#uvindex").append(uvIndex);
    };
};

//DEV-TEST runs the cityNameWeatherFetch function to populate the console
cityNameWeatherFetch();