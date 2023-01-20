const API_key = 'a16eabac5b6d42eda97655c75cd8ecc8'
// wait for page to load
window.onload = function(){
    let startPos;
    // declare geo function to grab current position
    let geoSuccess = function(position) {
        startPos = position;
        console.log(position)
        // fetch api data using the current location latitude and longitude
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&units=imperial&appid=${API_key}`)

        .then(data => data.json())

            .then(jsonData => {
                console.log(jsonData)
                // fetch the icon (picture) associated with the current weather
                fetch(`https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`)
                    .then((res) => res.blob())
                    .then((result) => {
                        // assign document properties for the location, country code, temperature, and description
                        document.getElementById("text_location").innerHTML = jsonData.name
                        document.getElementById("text_location_country").innerHTML = jsonData.sys.country
                        document.getElementById("text_temp").innerHTML = Math.round(jsonData.main.temp)
                        document.getElementById("text_description").innerHTML = jsonData.weather[0].description
                        // create object url to populate the icon that is associated with the current weather
                        const imageObjectURL = URL.createObjectURL(result);
                        document.getElementById("icon").src = imageObjectURL
                    })
            })
    
    }
    // access geolocation property on the navigator object and grab the current position passing in geoSucces func
    navigator.geolocation.getCurrentPosition(geoSuccess);
}
