//VARIABLES
var searchBoxLoc = "";
var cityName = "";
var country = "";
var weatherDate = "";
var longtitude = 0;
var latitude = 0;
var weatherObj = [];
var searchLoc = "";

//--FIRST fetch the co-ordinates based on the name of the location
function weatherFetch() {
    //DUMMY CITY NAME TO BE REPLACED WITH USER ENTRY FROM TEXT BOX
    searchBoxLoc = $("#city-pick").val();
    //DUMMY CITY NAME ENDS

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchBoxLoc + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    //extract the city name and country from this first API
                    cityName = data.name;
                    country = data.sys.country;
                    lon = data.coord.lon;
                    lat = data.coord.lat;
                    coordSearch(lat, lon);
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};


//--THEN a fetch to a different API using the co-ordinates of the named location. Returns a more complete weather profile
function coordSearch(latitude, longtitude) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data to be sent for processing
            if (response.ok) {
                response.json().then(function (data) {
                    //send the data to be rendered in HTML
                    dateFinder(data);
                });
            }
            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })
};

//--LAST renders the weather data for the given location on a given date to the correct HTML container
function renderWeatherData(data, pDate, date) {

    console.log(data);
    //cleaning up of previous search result
    $("#weather-container").empty();

    //date formatting
    var dayName = new Date(pDate).toString().slice(0, 3);
    var d = String(pDate.getDate()).padStart(2, '0');
    var m = String(pDate.getMonth() + 1).padStart(2, '0');
    pDate = dayName + ', ' + m + '/' + d;
    //***********************************************************************************
    //create a new card for each of the three days of weather IN FOUNDATION CSS. ALTER IF CSS IS CHANGED.
    var weatherCardEl = $("<div>")
        .addClass("card");
    var weatherCardTitleEl = $("<div>")
        .addClass("card-divider");
    var weatherCardBodyEl = $("<div>")
        .addClass("card-section");
    var weatherCardFooterEl = $("<div>")
        .addClass("card-divider card-footer");

    //insert the city name and country as well as an icon depicting the weather conditions
    var cityNameContainerEl = $("<h2>")
        .text("City of: " + cityName + ", " + country + " (" + pDate + ")");
    var currentWeatherIcon = data.daily[date].weather;
    currentWeatherIconEl = $("<img>")
        .attr("src", "http://openweathermap.org/img/wn/" + currentWeatherIcon[0].icon + "@2x.png");
    $(weatherCardTitleEl).append(cityNameContainerEl).append(currentWeatherIconEl);


    //TEMPERATURE
    var temperature = $("<div>")
        .text("Temperature: " + data.daily[date].temp.day + "°F");
    $(weatherCardBodyEl).append(temperature);

    //WINDSPEED
    var windSpeed = $("<div>")
        .text("Wind Speed: " + data.daily[date].wind_speed + " MPH");
    $(weatherCardBodyEl).append(windSpeed);

    //HUMIDITY
    var humidity = $("<div>")
        .text("Humidity: " + data.daily[date].humidity + "%");
    $(weatherCardBodyEl).append(humidity);
    //***LEGACY BOOTSTRAP CLASSES TO BE CHANGED***
    //UV INDEX WITH DIFFERENT TEXT COLORS BASED ON SEVERITY 
    if (data.current.uvi <= 2) {
        var uvIndex = $("<div>")
            .addClass("text-success bg-dark")
            .text("UV Index: " + data.daily[date].uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 5 && data.current.uvi > 2) {
        var uvIndex = $("<div>")
            .addClass("text-warning bg-dark")
            .text("UV Index: " + data.daily[date].uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 7 && data.current.uvi > 5) {
        var uvIndex = $("<div>")
            .addClass("text-orange bg-dark")
            .text("UV Index: " + data.daily[date].uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else if (data.current.uvi <= 10 && data.current.uvi > 7) {
        var uvIndex = $("<div>")
            .addClass("text-danger bg-dark")
            .text("UV Index: " + data.daily[date].uvi);
        $(weatherCardFooterEl).append(uvIndex);
    }

    else {
        var uvIndex = $("<div>")
            .addClass("text-violet bg-dark")
            .text("UV Index: " + data.daily[date].uvi);
        $(weatherCardFooterEl).append(uvIndex);
    };

    $(weatherCardEl).append(weatherCardTitleEl);
    $(weatherCardEl).append(weatherCardBodyEl);
    $(weatherCardEl).append(weatherCardFooterEl);
    $("#weather-container").append(weatherCardEl);
};

//FUNCTIONALITY TO PICK A DATE FROM A CALENDAR
$(function () {
    $("#date-pick").datepicker({ showOn: "both", buttonText: "", minDate: 0, maxDate: "+7D" });
});

function dateFinder(data) {
    weatherDate = $("#date-pick").val();
    weatherDate = new Date(weatherDate);
    var chosenDay = weatherDate.getTime();

    var x = new Date();
    var currentDay = x.getTime()
    var dateDiff = chosenDay - currentDay;
    dateDiff = Math.ceil(dateDiff / 86400000);
    
    renderWeatherData(data, weatherDate, dateDiff);
};

