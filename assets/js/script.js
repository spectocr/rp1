//VARIABLES
var searchBoxLoc = "";
var cityName = "";
var country = "";
var weatherDate = "";
var longtitude = 0;
var latitude = 0;
var weatherObj = [];

//***********EVENT LISTENERS FOR USER INPUT*******
$("#getGone").on("click", function(){
weatherFetch();
});

//CRS set departure date to tomorrow
var tomorrow = moment().add(01, 'days').format('YYYY-MM-DD');
$("#depDate").attr("value", tomorrow)

// CRS query selectors
var airline = document.getElementById('airline');
var DepartureDate = document.getElementById('DepartureDate');
var DirectFlight = document.getElementById('DirectFlight');
var MinPrice = document.getElementById('MinPrice');


console.log(airline);

/// CRS fetch flight info.

fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/ORD-sky/anytime", {
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "a54ca3a1f3msh0c6896d0f1fe25ep12b2bajsn2f4c15928ba5",
        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    }
})

.then(function(json) {

    for (var i = 0; i < json.Carriers.length; i++) {
    //create p for airline
    var airlinep = document.createElement("p");
    airline.appendChild(airlinep);
    airlinep.setAttribute("class" ,"flightJSON")
    airlinep.innerHTML = json.Carriers[i].Name;

    //creat p for date
    var DepartureDatep = document.createElement("p");
    DepartureDate.appendChild(DepartureDatep);
    DepartureDatep.setAttribute("class" ,"flightJSON")
    var dateParser = json.Quotes[i].OutboundLeg.DepartureDate.split("T" , 1);
    DepartureDatep.innerHTML = dateParser;

    //create p for direct
    var DirectFlightp = document.createElement("p");
    DirectFlight.appendChild(DirectFlightp);
    DirectFlightp.setAttribute("class" ,"flightJSON")
    if (json.Quotes[i].Direct == true) {
        DirectFlightp.innerHTML = "Yassss, we only fly direct"
    } else {
        DirectFlightp.innerHTML = "N"
    };
    //DirectFlightp.innerHTML = DirectFlight;

    //create p for direct
    var MinPricep = document.createElement("p");
    MinPrice.appendChild(MinPricep);
    MinPricep.setAttribute("class" ,"flightJSON")
    MinPricep.innerHTML = "$" + json.Quotes[i].MinPrice;
    };




    console.log(json)
})

    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        //create p for airline
        var airlinep = document.createElement("p");
        airline.appendChild(airlinep);
        airlinep.innerHTML = json.Carriers[0].Name;
        console.log(json)
    });



var getFlightInfo = function () {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
                console.log(data);
            });
            console.log(response);
        } else {
            alert('error: gitgub user not found');
        }

    });


};

//--FIRST fetch the co-ordinates based on the name of the location
function weatherFetch() {
    //DUMMY CITY NAME TO BE REPLACED WITH USER ENTRY FROM TEXT BOX
    searchBoxLoc = $("#destCity").val();
    console.log(searchBoxLoc);
    //DUMMY CITY NAME ENDS

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchBoxLoc + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    //extract the city name and country from this first API
                    cityName = data.name;
                    country = data.sys.country;
                    longtitude = data.coord.lon;
                    latitude = data.coord.lat;
                    coordWeather(latitude, longtitude);
                });
            }

            //display error message if no response
            else {
                alert("INVALID ENTRY");
            }
        })

    //--THEN a fetch to a different API using the co-ordinates of the named location. Returns a more complete weather profile
    function coordWeather(lat, lon) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
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
};
//--LAST renders the weather data for the given location on a given date to the correct HTML container
function renderWeatherData(data) {

    $("#weather-container").empty();
    $("#weather-body").empty();
    $("#weather-title").empty();
    // Card Title
    var cityNameContainerEl = $("<h2>")
        .text("City of: " + cityName + ", " + country);
    $("#weather-title").append(cityNameContainerEl);

    //date formatting and card rendering in a for loop so all 7 days are taken into account.
    for (i = 0; i < 7; i++) {
        var today = new Date();
        today.setDate(today.getDate() + i);
        var dayName = today.toString().slice(0, 3);
        var d = String(today.getDate()).padStart(2, '0');
        var m = String(today.getMonth() + 1).padStart(2, '0');
        var date = dayName + ', ' + m + '/' + d;


        //card creation
        //create a new card for each of the three days of weather
        var weatherCardEl = $("<div>")
            .addClass("card");
        var weatherCardTitleEl = $("<div>")
            .addClass("card-divider");
        var weatherCardBodyEl = $("<div>")
            .addClass("card-section");
        var weatherCardFooterEl = $("<div>")
            .addClass("card-divider card-footer");

        //insert the city name and country as well as an icon depicting the weather conditions
        var weatherDateEl = $("<div>")
            .text(date);
        $(weatherCardTitleEl).append(weatherDateEl);

        var weatherIcon = data.daily[i + 1].weather[0].icon;
        var weatherIconEl = $("<img>")
            .attr("src", "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        $(weatherCardTitleEl).append(weatherIconEl);


        //TEMPERATURE
        var temperature = $("<div>")
            .addClass("card-body")
            .text("Temperature: " + data.daily[i + 1].temp.day + "°F");
        $(weatherCardBodyEl).append(temperature);

        //WINDSPEED
        var windSpeed = $("<div>")
            .addClass("card-body")
            .text("Wind Speed: " + data.daily[i + 1].wind_speed + " MPH");
        $(weatherCardBodyEl).append(windSpeed);

        //HUMIDITY
        var humidity = $("<div>")
            .addClass("card-body")
            .text("Humidity: " + data.daily[i + 1].humidity + "%");
        $(weatherCardBodyEl).append(humidity);

        //UV INDEX WITH DIFFERENT TEXT COLORS BASED ON SEVERITY
        if (data.daily[i + 1].uvi <= 2) {
            var uvIndex = $("<div>")
                .addClass("card-footer")
                .text("UV Index: " + data.daily[i + 1].uvi);
            $(weatherCardFooterEl).append(uvIndex);
        }

        else if (data.daily[i + 1].uvi <= 5 && data.daily[i + 1].uvi > 2) {
            var uvIndex = $("<div>")
                .addClass("card-footer")
                .text("UV Index: " + data.daily[i + 1].uvi);
            $(weatherCardFooterEl).append(uvIndex);
        }

        else if (data.daily[i + 1].uvi <= 7 && data.daily[i + 1].uvi > 5) {
            var uvIndex = $("<div>")
                .addClass("card-footer")
                .text("UV Index: " + data.daily[i + 1].uvi);
            $(weatherCardFooterEl).append(uvIndex);
        }

        else if (data.daily[i + 1].uvi <= 10 && data.daily[i + 1].uvi > 7) {
            var uvIndex = $("<div>")
                .addClass("card-footer")
                .text("UV Index: " + data.daily[i + 1].uvi);
            $(weatherCardFooterEl).append(uvIndex);
        }

        else {
            var uvIndex = $("<div>")
                .addClass("card-footer")
                .text("UV Index: " + data.daily[i + 1].uvi);
            $(weatherCardFooterEl).append(uvIndex);
        };

        $(weatherCardEl).append(weatherCardTitleEl);
        $(weatherCardEl).append(weatherCardBodyEl);
        $(weatherCardEl).append(weatherCardFooterEl);
        $("#weather-body").append(weatherCardEl);
    };
};

// //FUNCTIONALITY TO PICK A DATE FROM A CALENDAR *** DEPRECIATED
// $(function () {
//     $("#date-pick").datepicker({ minDate: 0, maxDate: "+7D" });
// });

// function dateFinder(data) {
//     weatherDate = $("#date-pick").val();
//     for (i = 1; i >= -1; i--) {
//         var dayPredict = new Date(weatherDate);
//         dayPredict.setDate(dayPredict.getDate() - i);
//         renderWeatherData(data, dayPredict);
//     };
// };

