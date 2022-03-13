 var historyBox = $(".history-box");
 function initSearchRecord() {
   var histortyList = JSON.parse(localStorage.getItem("history"));
   var reverseList = histortyList.reverse();
   for (var i=0; i < reverseList.length; i++) {
      if ( i > 10) {
        break;
      }
      var history = $('<button class = "history btn btn-secondary btn-lg btn-block">' + reverseList[i] + '</button>');
      historyBox.append(history);
   }
 }

 initSearchRecord();

 $(".history").click(function() {
  var content = $(this).text();
  searchLocation(content);
})
 
 $("#search-button").click(function() {
    var content = $("#search-content").val();
    searchLocation(content);
 });

 function initialDataContent(city, weatherData) {
   $("#city-and-time").text(city + ": "+ moment().format("L"));
   $("#temp").text("Temp: "+weatherData.current.temp);
   $("#wind").text("Wind: "+ weatherData.current.wind_speed);
   $("#humidity").text("Humidity: "+ weatherData.current.humidity);
   $("#uv-index").text("UV Index: "+ weatherData.current.uvi);

 }

 function searchLocation(content) {
  var locationResponse = fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + content + "&appid=a8adc8105c06ae9463caae0bc562930c");
  locationResponse
  .then(response => response.json()) 
  .then(locationData => {       
      if (locationData.length === 0){
        alert("Cannot find the location!");
      } else{
        if (localStorage.getItem("history") === null){
          localStorage.clear();
          var historyList = [];
          historyList.push(content);
          localStorage.setItem("history",JSON.stringify(historyList));
        } else{
          var historyList = JSON.parse(localStorage.getItem("history"));
          if (!historyList.includes(content)) {
            historyList.push(content);
          }
          localStorage.setItem("history",JSON.stringify(historyList));
        }


        var lat = locationData[0].lat;
        var lon = locationData[0].lon;
        var weatherResponse = fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + lat + "&lon=" + lon+ "&exclude=minutely,hourly,alerts&units=imperial&appid=a8adc8105c06ae9463caae0bc562930c");
        weatherResponse
        .then(response => response.json())
        .then(weatherData => {
          console.log(weatherData);
          initialDataContent(content, weatherData);
        })
      }  
      
  })
  .catch(error => {                 
        console.log(error);
  });
 }



