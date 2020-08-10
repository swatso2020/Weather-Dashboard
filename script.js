
// function initPage() {
    var inputEl = document.getElementById("city-input");
  
     var searchEl = document.getElementById("search-button");
 var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
   var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");4
    var currentWindEl = document.getElementById("wind-speed");
var currentUVEl = document.getElementById("UV-index");
  var historyEl = document.getElementById("history");
 var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
  
    
    
    var APIKey = "0f6a0292b38f74bf8626e6f98d015d2e";
//  When search button is clicked, read the city name typed by the user

    function getWeather(cityName) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName +"&APPID="+APIKey  
        //console.log("this is the city variable     "+ city)
//  Using saved city name, execute a current condition get request from open weather map api
                                    $.ajax({
                                            url: queryURL,
                                            method: "GET"
                                            })
                                    .then(function(response) {
                                           
                                            var temp = response.main.temp
                                            var cId = response.id
                                            localStorage.setItem ("temperature", temp);
                                            localStorage.setItem ("ID", cId);   
                                                            
 //Parse response to display current conditions
            var currentDate = new Date();
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            nameEl.innerHTML =   + month + "/" + day + "/" + year 
           var weatherPic = response.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",response.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(response.main.temp) + " &#176F";                       
            currentHumidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.wind.speed + " MPH";
        var lat = response.lat;
        var lon = response.lon;
        localStorage.setItem ("lattitude", lat);
        localStorage.setItem ("longitude", lon);
    })
}

      
        var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + localStorage.getItem("latitude") + "&lon=" + localStorage.getItem("longitude") + "&appid=" + APIKey + "&cnt=1";
        $.ajax({
            url: queryURLUv,
           method: "GET"
            })
        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVEl.innerHTML = "UV Index: ";
           currentUVEl.append(UVIndex);
        });

    
//  Using saved city name, execute a 5-day forecast get request from open weather map api
    //    var cityID = response.city.id;
    //    var fqueryURLForcast = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
    //    $.ajax({
    //     url: queryURLForcast,
    //     method: "GET"
    //     })
        // .then(function(response){
 //  Parse response to display forecast for next 5 days underneath current conditions
            // console.log(response);
            //  const forecastEls = document.querySelectorAll(".forecast");
            //  for (i=0; i<forecastEls.length; i++) {
            //     forecastEls[i].innerHTML = "";
            //    const forecastIndex = i*8 + 4;
            //     const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
            //     const forecastDay = forecastDate.getDate();
            //     const forecastMonth = forecastDate.getMonth() + 1;
            //     const forecastYear = forecastDate.getFullYear();
//                 const forecastDateEl = document.createElement("p");
//                 forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
//                 forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
//                 forecastEls[i].append(forecastDateEl);
//                 const forecastWeatherEl = document.createElement("img");
//                 forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
//                 forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
//                 forecastEls[i].append(forecastWeatherEl);
//                 const forecastTempEl = document.createElement("p");
//                 forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
//                 forecastEls[i].append(forecastTempEl);
//                 const forecastHumidityEl = document.createElement("p");
//                 forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
//                 forecastEls[i].append(forecastHumidityEl);
            //   }
        //   })
  //      }  
  //  }

    searchEl.addEventListener("click",function() {
        const searchTerm = inputEl.value;
      getWeather(searchTerm);
       searchHistory.push(searchTerm);
     localStorage.setItem("search",JSON.stringify(searchHistory));
      renderSearchHistory();
    })

    // clearEl.addEventListener("click",function() {
    //     searchHistory = [];
    //     renderSearchHistory();
    // })

    function k2f(K) {
    return Math.floor((K - 273.15) *1.8 +32);
    }

    function renderSearchHistory() {
        historyEl.innerHTML = "";
      for (let i=0; i<searchHistory.length; i++) {
    const historyItem = document.createElement("input");
           //  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
             historyItem.setAttribute("type","text");
             historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
             historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                 getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
         }
    }

    // renderSearchHistory();
    // if (searchHistory.length > 0) {
    //     getWeather(searchHistory[searchHistory.length - 1]);
    // }


//  Save user's search requests and display them underneath search form
//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for