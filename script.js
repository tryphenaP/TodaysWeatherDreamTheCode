function initAutocomplete() {
    
    var options= {
        types: ['(cities)'],

    };   

    var weatherLocationImput = document.getElementById('weather-location');
    var weatherLocationAutocomplete = new google.maps.places.Autocomplete(weatherLocationImput, options);


    weatherLocationAutocomplete.addListener('place_changed', function() {
    var weatherLocationLatitude= weatherLocationAutocomplete.getPlace().geometry.location.lat();
    var weatherLocationLongitude= weatherLocationAutocomplete.getPlace().geometry.location.lng();
    var weatherAPIURL= `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitude}&longitude=${weatherLocationLongitude}&hourly=temperature_2m`;

    fetch(weatherAPIURL)
        .then(response => response.json())
        .then(data => {
            var weatherDescription = data.weather[0].description;
            var temperature = data.main.temp;
            var humidity = data.main.humidity;
            var windSpeed = data.wind.speed;
            console.log(temperature);

            var weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = `
                <h2>Weather Information</h2>
                <p><strong>Description:</strong> ${weatherDescription}</p>
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