function initAutocomplete() {
    
    var options= {
        types: ['(cities)'],

    };   

    var weatherLocationImput = document.getElementById('weather-location');
    var weatherLocationAutocomplete = new google.maps.places.Autocomplete(weatherLocationImput, options);

    window.onload = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var weatherLocationLatitudeOnload = position.coords.latitude;
        var weatherLocationLongitudeOnload = position.coords.longitude;
    
     var weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitudeOnload}&longitude=${weatherLocationLongitudeOnload}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,rain,showers,snowfall`;
        var mapProp= {
           center:new google.maps.LatLng(weatherLocationLatitudeOnload,weatherLocationLongitudeOnload),
           zoom:5,
            };
            
            var marker = new google.maps.Marker({position: { lat: weatherLocationLatitudeOnload, lng: weatherLocationLongitudeOnload }, animation: google.maps.Animation.BOUNCE,
      mapTypeId:google.maps.MapTypeId.HYBRID});
            

    fetch(weatherAPIURL)
        .then(response => response.json())
        .then(data => {
            
            var temperature = data.current.temperature_2m;
            var humidity = data.current.relative_humidity_2m;
            var windSpeed = data.current.wind_speed_10m;    
            var isDay = data.current.is_day;
            var rain = data.current.rain;
            var showers = data.current.showers;
            var snowfall = data.current.snowfall;

            var weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = `
                <h2>Current Location Weather Information</h2>
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity} %</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p> 
                <p><strong>Is Day:</strong> ${isDay} </p>   
                <p><strong>Rain:</strong> ${rain} mm</p>
                <p><strong>Showers:</strong> ${showers} mm</p>
                <p><strong>Snowfall:</strong> ${snowfall} cm</p>    
            `;


            var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
            marker.setMap(map);
            const weatherBackgroundImage = document.getElementById('weather-background');

            if (isDay==1 && rain == 0 && showers == 0) {
                weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/clear&sunny.jpeg')";
            } else if ((rain > 0) || (showers > 0)) {
                weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night.jpeg')";
            } else {
                weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/day&Rainny.jpeg')";
            }

        })       
            .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

     
};
    weatherLocationAutocomplete.addListener('place_changed', function() {
    var weatherLocationLatitude= weatherLocationAutocomplete.getPlace().geometry.location.lat();
    var weatherLocationLongitude= weatherLocationAutocomplete.getPlace().geometry.location.lng();
    var weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitude}&longitude=${weatherLocationLongitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
        var mapProp= {
           center:new google.maps.LatLng(weatherLocationLatitude,weatherLocationLongitude),
           zoom:5,
            };
            
            var marker = new google.maps.Marker({position: { lat: weatherLocationLatitude, lng: weatherLocationLongitude }});



    fetch(weatherAPIURL)
        .then(response => response.json())
        .then(data => {
            
            var temperature = data.current.temperature_2m;
            var humidity = data.current.relative_humidity_2m;
            var windSpeed = data.current.wind_speed_10m;

            var weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = `
                <h2>${weatherLocationAutocomplete.getPlace().name} Weather Information</h2>
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity} %</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
            `;

            
            var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
            marker.setMap(map);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        }); 
       });


};