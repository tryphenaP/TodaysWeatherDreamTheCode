function initAutocomplete() {

    /* AutoComplete cities */
    var options = {
        types: ['(cities)'],
    };
    var weatherLocationImput = document.getElementById('weather-location');
    var weatherLocationAutocomplete = new google.maps.places.Autocomplete(weatherLocationImput, options);

    /* Displaying the weather detials, map and background on loading based on the current location of the user */
    window.onload = function () {
        navigator.geolocation.getCurrentPosition(function (position) {

            /* Getting the latitude and longitude */
            var weatherLocationLatitudeOnload = position.coords.latitude;
            var weatherLocationLongitudeOnload = position.coords.longitude;

            /* accessing open meteo with the obtaining laitude and longitude  to obtain temperature , humidity, windspeed, dayornight , snowfall , raining WITH RESTful API*/
            var weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitudeOnload}&longitude=${weatherLocationLongitudeOnload}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,rain,showers,snowfall`;



            /* 1.request data i.e. sends an HTTP request to the weather API  2.response.json() → convert to JS  3. data → actual weather info 4.then() → wait for async steps*/
            fetch(weatherAPIURL)
                .then(response => response.json())
                .then(data => {

                    var temperature = data.current.temperature_2m;
                    var humidity = data.current.relative_humidity_2m;
                    var windSpeed = data.current.wind_speed_10m;
                    var isDay = data.current.is_day;
                    var dayText = isDay == 1 ? "Morning" : "Night";
                    var rain = data.current.rain;
                    var showers = data.current.showers;
                    var snowfall = data.current.snowfall;

                    /* Display the fetched data in the weather info div */
                    var weatherInfoDiv = document.getElementById('weather-info');
                    weatherInfoDiv.innerHTML = `
                <h2>Current Location Weather Information</h2>
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity} %</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p> 
                <p><strong>Time of the Day:</strong> ${dayText} </p>   
                <p><strong>Rain:</strong> ${rain} mm</p>
                <p><strong>Snowfall:</strong> ${snowfall} cm</p>    
            `;



                    /* Displaying the background image based on weather conditions */
                    const weatherBackgroundImage = document.getElementById('weather-background');
                    if (isDay == 1 && rain == 0 && showers == 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/clear&sunny.jpeg')";
                    } else if (isDay == 1 && rain >= 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/day&Rainny.jpeg')";
                    } else if (isDay == 1 && snowfall > 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/morning&snow.jpeg.jpeg')";
                    } else if (isDay == 0 && rain == 0 && showers == 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night.jpeg')";
                    } else if (isDay == 0 && rain > 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night.jpeg')";
                    } else if (isDay == 0 && snowfall > 0) {
                        weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night&snow.jpeg')";
                    }





                    /* How the map looks 1)center: it denoted the has to be centered around the latitude and longitude 2)zoom: 5- to show the country and some near by region*/
                    var mapProp = {
                        center: new google.maps.LatLng(weatherLocationLatitudeOnload, weatherLocationLongitudeOnload),
                        zoom: 5,
                        mapTypeId: google.maps.MapTypeId.HYBRID
                    };

                    /* To position the pointer in the 1.current location in the map and 2.to make pointer bounce */
                    var marker = new google.maps.Marker({
                        position: { lat: weatherLocationLatitudeOnload, lng: weatherLocationLongitudeOnload },
                        animation: google.maps.Animation.BOUNCE
                    });

                    /* To create the map in the div with id googleMap and to set the marker on the map */
                    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
                    marker.setMap(map);



                })

                /* To handle errors in fetching weather data */
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });


    };

    /* Displaying the weather detials, map and background based on the autotyped location in the text box */
    weatherLocationAutocomplete.addListener('place_changed', function () {
        /* Getting the latitute and longitude from he autotyped text box */
        var weatherLocationLatitude = weatherLocationAutocomplete.getPlace().geometry.location.lat();
        var weatherLocationLongitude = weatherLocationAutocomplete.getPlace().geometry.location.lng();
        /* accessing open meteo with the obtaining laitude and longitude  to obtain temperature , humidity, windspeed, dayornight , snowfall , raining WITH RESTful API*/
        var weatherAPIURL = `https://api.open-meteo.com/v1/forecast?latitude=${weatherLocationLatitude}&longitude=${weatherLocationLongitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,is_day,rain,showers,snowfall`;


        /* 1.request data i.e. sends an HTTP request to the weather API  2.response.json() → convert to JS  3. data → actual weather info 4.then() → wait for async steps*/
        fetch(weatherAPIURL)
            .then(response => response.json())
            .then(data => {

                var temperature = data.current.temperature_2m;
                var humidity = data.current.relative_humidity_2m;
                var windSpeed = data.current.wind_speed_10m;
                var isDay = data.current.is_day;
                var dayText = isDay == 1 ? "Morning" : "Night";
                var rain = data.current.rain;
                var showers = data.current.showers;
                var snowfall = data.current.snowfall;

                /* Display the fetched data in the weather info div */
                var weatherInfoDiv = document.getElementById('weather-info');
                weatherInfoDiv.innerHTML = `
                <h2>Current Location Weather Information</h2>
                <p><strong>Temperature:</strong> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity} %</p>
                <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p> 
                <p><strong>Time of the day: </strong> ${dayText} </p>   
                <p><strong>Rain:</strong> ${rain} mm</p>
                <p><strong>Snowfall:</strong> ${snowfall} cm</p>    
            `

                /* Displaying the background image based on weather conditions */
                const weatherBackgroundImage = document.getElementById('weather-background');
                if (isDay == 1 && rain == 0 && showers == 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/clear&sunny.jpeg')";
                } else if (isDay == 1 && rain >= 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/day&Rainny.jpeg')";
                } else if (isDay == 1 && snowfall > 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/morning&snow.jpeg.jpeg')";
                } else if (isDay == 0 && rain == 0 && showers == 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night.jpeg')";
                } else if (isDay == 0 && rain > 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night.jpeg')";
                } else if (isDay == 0 && snowfall > 0) {
                    weatherBackgroundImage.style.backgroundImage = "url('weatherBackgroundImages/night&snow.jpeg')";
                }

            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });



        /* How the map looks 1)center: it denoted the has to be centered around the latitude and longitude 2)zoom: 5- to show the country and some near by region*/
        var mapProp = {
            center: new google.maps.LatLng(weatherLocationLatitude, weatherLocationLongitude),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };

        /* To position the pointer in the 1.current location in the map and 2.to make pointer bounce */
        var marker = new google.maps.Marker({
            position: { lat: weatherLocationLatitude, lng: weatherLocationLongitude },
            animation: google.maps.Animation.BOUNCE
        });

        /* To create the map in the div with id googleMap and to set the marker on the map */
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        marker.setMap(map);
    });
};

// 1. Expose the function to the window so Google Maps can find it
window.initAutocomplete = initAutocomplete;

// 2. Dynamically load the Google Maps script with the secure key
const loadGoogleMaps = () => {
    const script = document.createElement('script');
    
    // Grab the key from the .env file using Vite's special syntax
    const apiKey = import.meta.env.VITE_API_KEY; 
    
    // Construct the URL with the key and the callback
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
    script.async = true;
    script.defer = true;
    
    // Add the script to the page
    document.head.appendChild(script);
};

// 3. Trigger the loader
loadGoogleMaps();