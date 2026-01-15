function initAutocomplete() {
    alert("Options loaded");
    var options= {
        types: ['(cities)'],

    };    
    var weatherLocationImput = document.getElementById('weather-location');
    var weatherLocationAutocomplete = new google.maps.places.Autocomplete(weatherLocationImput, options);
    alert(weatherLocationAutocomplete);
    };