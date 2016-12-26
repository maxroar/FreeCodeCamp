$(document).ready(function(){
  //variables to hold the user's lat and longitude
  var lat = 0;
  var lon = 0;
  //variables to hold city name and temp
  var cityName;
  var temp;
  //a function to set the location of the user based on latitude and longitutd on pageload
  function setLoc(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(setPos);
      //set the lat and lon variables to integers
    }else alert('Geolocation has been disabled by your browser. Please use the search bar.');
    function setPos(position){
      lat = Math.floor(position.coords.latitude);
      lon = Math.floor(position.coords.longitude);
      console.log(lat, lon);
      callCoords();
    }
  }
  function callCoords(){
    $.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=be0f61e7a55bf452fa1de4d1ba944b32`, function(response){
      console.log(response);
      setVars(response);
    });
  }
  setLoc();
  function setVars(response){
    cityName = response.name;
    temp = response.main.temp;
    displayContent();
  }
  //a function to change the formatting based on the temp
  function displayContent(){
    if(temp < 50){
      $('#style').html(`<link id="style" rel="stylesheet" href="styles/cold.css">`);
    }else if(temp <85){
      $('#style').html(`<link id="style" rel="stylesheet" href="styles/perfect.css">`);
    }else if(temp >=85){
      $('#style').html(`<link id="style" rel="stylesheet" href="styles/hot.css">`);
    }else $('#style').html(`<link id="style" rel="stylesheet" href="styles/main.css">`);

    $('#resultDisplay').html(`
      <h2>${cityName}</h2>
      <h3>${temp}&#8457;</h3>
      <button id="f" type="button">Fahrenheit</button>
      <button id="c" type="button">Celcius</button>
      `);
      //functions for the f-c buttons
      $('#f').on('click', function(){
        temp = (9/5)*temp + 32;
        //limit to 2 decimals
        temp = temp.toFixed(2);
        $('h3').html(`<h3>${temp}&#8457;</h3>`);
        $('#c').attr('class','inactive');
        $('#f').attr('class','active');
        console.log(temp);
      });
      $('#c').on('click', function(){
        temp = (temp-32)*5/9;
        //limit to 2 decimals
        temp = temp.toFixed(2);
        $('h3').html(`<h3>${temp}&#8451;</h3>`);
        $('#c').attr('class','active');
        $('#f').attr('class','inactive');
        console.log(temp);
      });
  }
  //a function to set the
  $('form').on('submit', function(){
    var cityName = $(this).serialize();
    console.log(cityName);
    $.get(`http://api.openweathermap.org/data/2.5/weather?${cityName}&units=imperial&appid=be0f61e7a55bf452fa1de4d1ba944b32`, function(response){
      setVars(response);
      displayContent();
    });
    return false;
  });

});
