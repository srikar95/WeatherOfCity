// Getting Values By Class
const keywordRef = document.querySelector('.form-control');
var submitRef = document.querySelector('.btn');
var cityRef = document.querySelector('.city');
var countryRef = document.querySelector('.country');
var tempRef = document.querySelector('.temp');
var highTempRef = document.querySelector('.highTemp');
var lowTempRef = document.querySelector('.lowTemp');
var sunriseRef = document.querySelector('.sunrise');
var sunsetRef = document.querySelector('.sunset');
var descRef = document.querySelector('.desc');
var dateRef = document.querySelector('.date');

// Initial
getWeatherData('Hyderabad');
keywordRef.value = '';

// On Button Click
submitRef.addEventListener('click', function() {
	getWeatherData(keywordRef.value);
});

// On Keyup Enter
keywordRef.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		getWeatherData(keywordRef.value);
	}
});

function getWeatherData(city) {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=25b2170e409c489ae59a7d686d8ec85e`)
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if(data.cod == 200) {
			cityRef.innerHTML = data.name;
			countryRef.innerHTML = data['sys']['country'];

			// Tempeartures
			tempRef.innerHTML = Math.round(data['main']['temp'] - 273.15)+ '<span>&#8451;</span>';
			highTempRef.innerHTML = Math.round(data['main']['temp_max'] - 273.15)+ '<span>&#8451;</span>';
			lowTempRef.innerHTML = Math.round(data['main']['temp_min'] - 273.15)+ '<span>&#8451;</span>';

			// Description
			descRef.innerHTML = data['weather'][0]['main'];
			document.getElementById('wicon').src = "http://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png";
			let weatherMain = data['weather'][0]['main'];
			
			if (weatherMain == 'Clouds') {

				document.getElementById('home-section').style.backgroundImage="url(../img/scattered_clouds.jpg)";

			} else if(weatherMain == 'Thunderstorm') {

				document.getElementById('home-section').style.backgroundImage="url(../img/thunderstorm.jpg)";

			} else if(weatherMain == 'Rain') {

				document.getElementById('home-section').style.backgroundImage="url(../img/raining.jpg)";

			} else if(weatherMain == 'Drizzle') {

				document.getElementById('home-section').style.backgroundImage="url(../img/light_rain.jpg)";

			} else if(weatherMain == 'Snow') {

				document.getElementById('home-section').style.backgroundImage="url(../img/snow.jpg)";

			} else if(weatherMain == 'Clear') {

				document.getElementById('home-section').style.backgroundImage="url(../img/clear_sky.jpg)";

			} else if(weatherMain == 'Mist') {

				document.getElementById('home-section').style.backgroundImage="url(../img/mist.jpg)";

			} else {

				document.getElementById('home-section').style.backgroundImage="url(../img/mist.jpg)";

			}
			
			// Date
			dateRef.innerHTML = calcTime((data.timezone/3600));
			sunriseRef.innerHTML = calcSunTime(data['sys']['sunrise'], (data.timezone/3600));
			sunsetRef.innerHTML = calcSunTime(data['sys']['sunset'], (data.timezone/3600));
		} else {
			alert(data.message+'. Please try again.');
		}
	})
	.catch(error => {
		alert('Please Try Again!'+ cityRef.innerHTML);
		// getWeatherData('Hyderabad');
	});
}

function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString('en-US', { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' });
}

function calcSunTime(suntime, offset) {
    d = new Date(suntime*1000);
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}