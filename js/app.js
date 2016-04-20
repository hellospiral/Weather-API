var apiKey = "8bef59c8248608e4c4db2786f2c7b018";

$(document).ready(function() {
    
    $("#compareHumidity").click(function() {
        var city1 = $('#location1').val();
        var city2 = $('#location2').val();
        var city1Humidity;
        
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city1 + '&appid=' + apiKey).then(function(response) {
            city1Humidity = response.main.humidity;
        });
        
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city2 + '&appid=' + apiKey).then(function(response) {
            var city2Humidity = response.main.humidity;
             
            if (city1Humidity > city2Humidity) {
                $(".showWeather").html('<p>' + city1 + " (" + city1Humidity + "%) is more humid than " + city2 + " (" + city2Humidity + "%).</p>");
            }
            else if (city2Humidity > city1Humidity) {
                $(".showWeather").html('<p>' + city2 + " (" + city2Humidity + "%) is more humid than " + city1 + " (" + city1Humidity + "%).</p>");
            }
            else {
                $(".showWeather").html("<p>" + city1 + " and " + city2 + " are both at " + city1Humidity + "% humidity.</p>");
            }
        }).fail(function(error) {
            $(".showWeather").text(error.resopnseJSON.message);
        });
    }); //end "#compareHumidity"
    
    $("#compareTemp").click(function() {
        var city1 = $('#location1').val();
        var city2 = $('#location2').val();
        var city1TempKelvin;
        var tempFormat = $('input[name=temp]:checked', '#tempForm').val();
        
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city1 + '&appid=' + apiKey).then(function(response) {
            city1TempKelvin = parseInt(response.main.temp);
        });
        
        $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city2 + '&appid=' + apiKey).then(function(response) {
            var city2TempKelvin = parseInt(response.main.temp);
            var city2TempCelsius = city2TempKelvin - 273;
            var city2TempFarenheit = ((city2TempKelvin - 273) * 1.8) + 32;
            var city1TempCelsius = city1TempKelvin - 273;
            var city1TempFarenheit = ((city1TempKelvin - 273) * 1.8) + 32;
            
            if (tempFormat === undefined) {
                $(".showTemp").html("<p>Please select either celsius of farenheit.</p>");
            }
            
            else if (tempFormat === "farenheit") {
                if (city1TempKelvin > city2TempKelvin) {
                    $(".showTemp").html("<p>" + city1 + " (" + city1TempFarenheit + " degrees F)" + " is warmer than " + city2 + " (" + city2TempFarenheit  + " degrees F)" + ".</p>");
                }
                else if (city2TempKelvin > city1TempKelvin) {
                    $(".showTemp").html("<p>" + city2 + " (" + city2TempFarenheit + " degrees F)" + " is warmer than " + city1 + " (" + city1TempFarenheit  + " degrees F)" + ".</p>");
                }
                else {
                    $(".showTemp").html("<p>" + city1 + " and " + city2 + " are both at " + city1TempFarenheit + " degrees F.</p>");
                }
                
            }
            else if (tempFormat === "celsius") {
                if (city1TempKelvin > city2TempKelvin) {
                    $(".showTemp").html("<p>" + city1 + " (" + city1TempCelsius + " degrees C)" + " is warmer than + " + city2 + " (" + city2TempCelsius + " degrees C"  + ")" + ".</p>");
                }
                else if (city2TempKelvin > city1TempKelvin) {
                    $(".showTemp").html("<p>" + city2 + " (" + city2TempCelsius + " degrees C)" + " is warmer than + " + city1 + " (" + city1TempCelsius + " degrees C)" + ".</p>");
                }
                else {
                    $(".showTemp").html("<p>" + city1 + " and " + city2 + " are both at " + city1TempCelsius + " degrees C.</p>");
                }
            }
        }).fail(function(error) {
            $(".showWeather").text(error.resopnseJSON.message);
        });
    });// end compareTemp click callback
    
});