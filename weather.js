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
  
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?id=' + myId + '&APPID=06dcf0e82cb45b8b6964a33d135e1ed6',
      success: function weather(data) {
        console.log(data);
        var temp = Math.round(data.main.temp - 273.15);
        var html = 'Current weather: <br>' + 
        				 'Location: ' + data.name + '<br>' + 
       				 'Weather: ' + data.weather[0].description + '<br>' + 
       				 'Temperature: ' + temp + 'C<br>' + 'Humidity: ' + data.main.humidity + '%<br>' +
       				  'Wind: ' + data.wind.speed + 'm/s';
        $('#weather').html(html);
        var imgdes = data.weather[0].icon;
        $('.img1').empty();
        $('.img1').append('<img src="img/' + imgdes + '.png"/>');
      },
      error: function() {
        alert("Error");
      }
    });
   
    $.ajax({

      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/forecast?id=' + myId + '&APPID=06dcf0e82cb45b8b6964a33d135e1ed6',
      success: function weather(data) {
        console.log(data);
        var temp = Math.round(data.list[3].main.temp - 273.15);
        var date=(data.list[3].dt_txt).slice(0,10);
        var html = 'Weather for: ' + date +'<br>' +
        				'Loation: ' + data.city.name + '<br>' + 
        				 'Weather: ' + data.list[3].weather[0].description + '<br>' +        				 
             		 'Temperature: ' + temp + 'C<br>' + 
                   'Humidity: ' + data.list[3].main.humidity + '%<br>' + 
                    'Wind: ' + data.list[3].wind.speed + 'm/s';
                     $('#forecast').html(html);
        var imgdes=data.list[3].weather[0].icon;
        $('.img2').empty();        
        $('.img2').append('<img src="img/' + imgdes + '.png"/>');
      },
      error: function() {
        alert("Error");
      }
    });
  });
});
