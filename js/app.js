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
    
});