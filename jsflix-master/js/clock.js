"use strict";
// Get Element by ID

$(document).ready(function() {
    let $ = function(id) {
        return document.getElementById(id);
    };

    // Display Current Time Object

    let displayCurrentTime = function() {
        let d = new Date();
        let currentHour = d.getHours();

        let date = {
            currentHour: function() {
                let updatedHours = d.getHours();
                if (updatedHours > 12) {
                    updatedHours -= 12;
                    $("hours").innerHTML = padSingleDigit(updatedHours);
                    $("ampm").innerHTML = "PM";
                } else {
                    $("hours").innerHTML = padSingleDigit(currentHour);
                    $("ampm").innerHTML = "AM";
                }
            },
            currentMinute: function() {
                let currentMinute = d.getMinutes();
                $("minutes").innerHTML = padSingleDigit(currentMinute);
            },
            currentSecond: function() {
                let currentSecond = d.getSeconds();
                $("seconds").innerHTML = padSingleDigit(currentSecond);
            }
        };
        date.currentHour();
        date.currentMinute();
        date.currentSecond();
    };

    // Pad the time values to Double Digits

    let padSingleDigit = function(num) {
        if (num < 10) {
            return "0" + num;
        } else {
            return num;
        }
    };

    // Display Time

    displayCurrentTime();
    setInterval(function() {
        displayCurrentTime();
    }, 1000)
    

});
