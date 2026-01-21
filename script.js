function initAutocomplete() {
    
    var options= {
        types: ['(cities)'],

    };   

    var weatherLocationImput = document.getElementById('weather-location');
    var weatherLocationAutocomplete = new google.maps.places.Autocomplete(weatherLocationImput, options);


    weatherLocationAutocomplete.addListener('place_changed', function() {
    var weatherLocationLatitude= weatherLocationAutocomplete.getPlace().geometry.location.lat();
    var weatherLocationLongitude= weatherLocationAutocomplete.getPlace().geometry.location.lng();
    var weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitude}&longitude=${weatherLocationLongitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;


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
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        }); 
       });


};