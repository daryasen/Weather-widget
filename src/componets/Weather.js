import React from "react";

function Weather(props) {
   let icon = `http://openweathermap.org/img/w/${props.weather.weather[0].icon}.png`
   return (
      <div className="weather">
         <div className="temp-icon">
            <p className="temp">{props.weather.main.temp}&#176;C</p>
            <img className="icon" src={icon} />
         </div>
         <div className="details">
            <p>Description: {props.weather.weather[0].description}</p>
            <p>Sunrise: {props.weather.sys.sunrise}</p>
            <p>Sunset: {props.weather.sys.sunset}</p>
            <p>Pressure: {props.weather.main.pressure}</p>
            <p>Humidity: {props.weather.main.humidity}</p>
            <p>Wind speed: {props.weather.wind.speed}</p>
         </div>
      </div>
   )
}

export default Weather

