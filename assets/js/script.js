//VARIABLES
var searchBoxLoc = "";


//--FIRST fetch the co-ordinates based on the name of the location
function cityNameWeatherFetch(){

    //DUMMY CITY NAME TO BE REPLACED WITH USER ENTRY FROM TEXT BOX
    searchBoxLoc = "Edison";
    //DUMMY CITY NAME ENDS

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchBoxLoc + "&units=imperial&appid=2fd9f6120b1e5e49f6b0893e50ef57f6")
        .then(function (response) {
            //check if there is a response then json the data and send it to be processed
            if (response.ok) {
                response.json().then(function (data) {
                    //extract the city name and country from this first API
                    cityNameAPI = data.name;
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
function renderWeatherData(data){
console.log(data);
};

//DEV-TEST runs the cityNameWeatherFetch function to populate the console
cityNameWeatherFetch();