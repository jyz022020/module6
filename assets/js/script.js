 $("#search-button").click(function() {
    var content = $("#search-content").val();
    alert(content);
    // var response = fetch("http://api.openweathermap.org/geo/1.0/direct?q="+content+"&limit=2&appid=a8adc8105c06ae9463caae0bc562930c");
    var response2 = fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=a8adc8105c06ae9463caae0bc562930c");
    response2.then(response => {
        console.log(response);
      });
    console.log(response2);
 });



