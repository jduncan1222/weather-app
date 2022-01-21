


const apiKey = '7bcfa069759c73a46b86f9e26fd8a5a2';


window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, err);
    }
}

let searchBox = document.querySelector(".submit-button");
searchBox.addEventListener("click", () => {

    document.querySelector(".err-msg").innerText = '';  //clear error message on click

    let cityName = document.querySelector(".search input").value;

    const api_name = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    const res = fetch(api_name)
      .then(checkFetch)
      .then((res) => res.json())
      .then((data) => {
        const {name} = data;
        const {temp, humidity} = data.main;
        const {description, icon} = data.weather[0];
        const {speed} = data.wind;
        updateData(name, temp, humidity, description, icon, speed);
      })
      .catch(err => {
          console.error('Error:', err); //error message in console
          document.querySelector(".err-msg").innerText = 'Error: City Not found'; //set error message for user
      });
      
});

let checkFetch = (response) => {
    if (response.ok == false) {
        throw Error(response.statusText + " - " + response.url);
    }
    return response;
}


async function success(pos) {
    let coord = pos.coords;         //get coordinates
    let lat = coord.latitude;
    let lon = coord.longitude;

    const api_coords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    const res = await fetch(api_coords); //fetch weather data
    const data = await res.json();

    
    const {name} = data;
    const {temp, humidity} = data.main;
    const {description, icon} = data.weather[0];
    const {speed} = data.wind;
    
    updateData(name, temp, humidity, description, icon, speed);
}

function err(err) {
    console.log(`Error: ${err.message}`);
}

function updateData(name, temp, humidity, description, icon, speed) {
    document.querySelector(".city h2").innerText = name;
    document.querySelector(".temp").innerText = `${parseInt(temp)}°F`;
    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".outlook p").innerText = description;
    document.querySelector(".outlook img").src = `http://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".wind").innerText = `Wind Speed: ${speed} mph`;
}


