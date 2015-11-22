$(document).ready( function () {

$('button').on ('click', function () {
$.ajax({
type: 'GET',
url: 'http://api.openweathermap.org/data/2.5/weather?q=Edinburgh&APPID=06dcf0e82cb45b8b6964a33d135e1ed6',
success: function weather (data) {
console.log(data);
alert('Location: ' + data.name + '\n' +
    'Temperature: ' + data.main.temp + 'K\n' +
     'Humidity: ' + data.main.humidity + '%\n' +
	 'Wind: ' + data.wind.speed + 'km/h \n');   

}
});
});
});