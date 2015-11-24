$(document).ready(function() {
  $.getJSON("cities.json", function(records) { 
    $.each(records.cities, function(i, val) {
      $('#city').append($('<option>').text(val.name).val(val.name));
    });
    if (localStorage.getItem('current')) {
      $('#city').val(localStorage.getItem('current'));
    }
  });

  $('#city').change(function() {
    localStorage.setItem('current', this.value);
  });

  $('button').on('click', function() {
    var myCity = localStorage.getItem('current');
    
    $.ajax({
      type: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + myCity + '&APPID=06dcf0e82cb45b8b6964a33d135e1ed6',
      success: function weather(data) {
			console.log(data);        
        var temp = Math.round(data.main.temp - 273.15);
        var html = 'Location: ' + data.name + '<br>' + 
						 'Weather: ' + data.weather[0].description + '<br>' +        				 
        				 'Temperature: ' + temp + 'C<br>' + 
        				 'Humidity: ' + data.main.humidity + '%<br>' + 
        				 'Wind: ' + data.wind.speed + 'm/s';
        $('#weather').html(html);
        var imgdes=data.weather[0].icon;
        console.log(imgdes);
			$('.img').empty();        
        $('.img').append('<img src="img/' + imgdes + '.png"/>');
       },
       error: function () {
       	alert("Error");
       	}
      }); 
       
  });
});
