const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "aafc23091d846f45e14e326dfe8cd206"
}

const search = document.querySelector('#search');
search.addEventListener('keypress', setQuery);

const icons = {
    'Clear': 'icons/Clear.png',
    'Rain': 'icons/Rain.png',
    'Thunderstorm': 'icons/Thunderstorm.png',
    'Drizzle': 'icons/Drizzle.png',
    'Snow': 'icons/Snow.png',
    'Clouds': 'icons/Clouds.png',
    'Mist': 'icons/Atmosphere.png',
    'Smoke': 'icons/Atmosphere.png',
    'Haze': 'icons/Atmosphere.png',
    'Dust': 'icons/Atmosphere.png',
    'Fog': 'icons/Atmosphere.png',
    'Sand': 'icons/Atmosphere.png',
    'Ash': 'icons/Atmosphere.png',
    'Squall': 'icons/Atmosphere.png',
    'Tornado': 'icons/Atmosphere.png'

}

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(search.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('#city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('#date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('#temp');
    temp.innerText = `${Math.round(weather.main.temp)}°F`;

    let type = weather.weather[0].main;

    let condition = document.querySelector('#condition');
    condition.innerText = type;

    let icon = icons[type];
    document.getElementById("icon").src=icon;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${date}, ${year}`;
}