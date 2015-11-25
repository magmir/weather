$(document).ready(function() {
  $.getJSON("cities.json", function(records) {
    $.each(records.cities, function(i, val) {
      $('#city').append($('<option>').text(val.name).val(val._id));
    });
    if (localStorage.getItem('current')) {
      $('#city').val(localStorage.getItem('current'));
    }
  });

  $('#city').change(function() {
    localStorage.setItem('current', this.value);
  });

  $('button').on('click', function() {
    var myId = localStorage.getItem('current');
    $('.wth').addClass('well');  

    var weatherForToday = function(data, day) {
      console.log(data);
      var myWeather = data.list[day];
      var temp = Math.round(myWeather.main.temp - 273.15);
      var date = (myWeather.dt_txt).slice(0, 10);
      var html = 'Weather for: ' + date + '<br>' + 'Weather: ' + myWeather.weather[0].description + '<br>' + 'Temperature: ' + temp + '&deg;C<br>' + 'Humidity: ' + myWeather.main.humidity + '%<br>' + 'Wind: ' + myWeather.wind.speed + 'm/s';
		    
      $('#weather').html(html);
      var imgdes = myWeather.weather[0].icon;
      $('.img1').empty();
      $('.img1').append('<img src="img/' + imgdes + '.png"/>');
    };

    var weatherForTomorrow = function(data, day) {
      console.log(data);
      var myWeather = data.list[day];
      var temp = Math.round(myWeather.main.temp - 273.15);
      var date = (myWeather.dt_txt).slice(0, 10);
      var html = 'Weather for: ' + date + '<br>' + 'Weather: ' + myWeather.weather[0].description + '<br>' + 'Temperature: ' + temp + '&deg;C<br>' + 'Humidity: ' + myWeather.main.humidity + '%<br>' + 'Wind: ' + myWeather.wind.speed + 'm/s';
      $('#forecast').html(html);
      var imgdes = myWeather.weather[0].icon;
      $('.img2').empty();
      $('.img2').append('<img src="img/' + imgdes + '.png"/>');
    };
 var weatherForDayAfterTomorrow = function(data, day) {
      console.log(data);
      var myWeather = data.list[day];
      var temp = Math.round(myWeather.main.temp - 273.15);
      var date = (myWeather.dt_txt).slice(0, 10);
      var html = 'Weather for: ' + date + '<br>' + 'Weather: ' + myWeather.weather[0].description + '<br>' + 'Temperature: ' + temp + '&deg;C<br>' + 'Humidity: ' + myWeather.main.humidity + '%<br>' + 'Wind: ' + myWeather.wind.speed + 'm/s';
      $('#forecast2').html(html);
      var imgdes = myWeather.weather[0].icon;
      $('.img3').empty();
      $('.img3').append('<img src="img/' + imgdes + '.png"/>');
    };

    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?id=' + myId + '&APPID=06dcf0e82cb45b8b6964a33d135e1ed6',
      success: function weather(data) {
        var today = 0;
        var tomorrow = 8;
        var dayAfterTomorrow=16;
        weatherForToday(data, today);
        weatherForTomorrow(data, tomorrow);
        weatherForDayAfterTomorrow (data, dayAfterTomorrow);
      },
      error: function() {
        alert("Error");
      }
    });


  });
});
