let appID = '1647dc36c9a950b573c65dbc67fd65ee';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather (searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init (resultfromServer) {
    switch (resultfromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("img/Clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("img/Cloudy.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("img/Rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("img/Storm.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("img/Snow.jpg")';
            break;
        default:
            break;
    }
    
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultfromServer.weather[0].icon + '.png';

    let resultDescription = resultfromServer.weather[0].description;
    weatherDescriptionHeader.innerHTML = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultfromServer.main.temp) + '°';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultfromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultfromServer.name;
    humidityElement.innerHTML = 'Humidy levels at ' + resultfromServer.main.humidity + ' %';

    setPositionForWeather();
}

function setPositionForWeather() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidht = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidht/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
})