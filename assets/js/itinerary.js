// var currentTime = moment().format('LLLL');
// document.getElementById("currentDay").innerHTML = currentTime;
// console.log(currentTime);

$(document).ready(function () {

    $(".keep").on("click", function () {
        console.log("it works");
        var currentTime = $(this).parent().siblings(".colorcode").attr("id")
        var text = $(this).parent().siblings(".description").children().val()
        localStorage.setItem(currentTime, text)
        console.log(currentTime);
    });


    $("#nine").val(localStorage.getItem("9"))
    $("#ten").val(localStorage.getItem("10"))
    $("#eleven").val(localStorage.getItem("11"))
    $("#twelve").val(localStorage.getItem("12"))
    $("#one").val(localStorage.getItem("13"))
    $("#two").val(localStorage.getItem("14"))
    $("#three").val(localStorage.getItem("15"))
    $("#four").val(localStorage.getItem("16"))
    $("#five").val(localStorage.getItem("17"))

    function captureSaveEvent() {
        var currentTime = moment().hours()
        console.log(currentTime);
        for (let i = 9; i <= 17; i++) {
            var timeBlock = localStorage.getItem('.each' + i);
            $('#input-' + i).val(timeBlock);
            if (i > currentTimeBlock) {
                $('#input-' + i).addClass("future");
            }
            else if (i < currentTimeBlock) {
                $('#input-' + i).addClass("past")
            }
            else { $('#input-' + i).addClass("present"); }
        }
    }
var row = $( "div" );
var timediv = $( "div" );
var inputDiv = $( "div" );
var inputText = $( "input" );
var saveIcon = $( "div" );
var saveBtn = $( "button" );

//we have created the variable j, but we're waiting for the user's click event to define it

//at some point in your function you will need to define j as the users' day input
function userdayinput() {
let j = userDaySelect;
for ( let i = 0; i < j; i++){
    //dynamically render all those html variables that you just created
    //look up "add Class " functionality and "appends" functionality to get it where you want and how you want it to look
    //don't forget to figure out how to assign a unique id so that you can tag localStorage
}
}
//i is going to be generated dynamically based on what list item the user clicks
//your job will be to figure out how to create a numb variable based on the days of the week for the trip


})
