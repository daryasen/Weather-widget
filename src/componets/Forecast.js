import React from "react";

function Forecast(props) {
      return (
         <div className="forecast">
            {props.forecast.map((el) => {
               const ms = el.dt * 1000;
               const weekdayName = new Date(ms).toLocaleString('en', { weekday: 'long' });
               let icon = `http://openweathermap.org/img/w/${el.weather[0].icon}.png`
               const rise = new Date(el.sys.sunrise)
               const sunrise = rise.toLocaleTimeString()
               const set = new Date(el.sys.sunset)
               const sunset = set.toLocaleTimeString()
               return (
                  <div className="weather" key={ms}>
                     <h2 className="weekday">{weekdayName}</h2>
                     <div className="temp-icon">
                        <p className="temp">{el.main.temp}&#176;C</p>
                        <img className="icon" src={icon} />
                     </div>
                     <div className="details">
                        <p>Description: {el.weather[0].description}</p>
                        <p>Sunrise: {sunrise}</p>
                        <p>Sunset: {sunset}</p>
                        <p>Pressure: {el.main.pressure} mm.hg</p>
                        <p>Humidity: {el.main.humidity} %</p>
                        <p>Wind speed: {el.wind.speed} m/s</p>
                     </div>
                  </div>
               )
            })}
         </div>
      )
}

export default Forecast