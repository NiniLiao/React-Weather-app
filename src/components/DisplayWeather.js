import React from "react";
import "./displayweather.css";
function DisplayWeather(props) {
  const { data } = props;
  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod != 404 ? data.weather[0].icon : null}` +
    ".png";
  return (
    <div className="displayweather">
      {data.cod != 404 ? (
        <React.Fragment>
          <div className="maincard">
            <span className="cardtitle">
              {data.name} , {data.sys.country}
            </span>

            <span className="cardsubtitle-text">
              Time:
            </span>
            <span className="cardsubtitle">
              {new Date().toLocaleString('en-US', { hour12: true }).replace(/\//g, '-')}
            </span>

            <span className="weather-temperature-text">  
            Temperature:
            </span>   
            <span className="weather-temperature">
              {" "}
               
              {Math.floor(data.main.temp_min - 273.15)} 
              <sup>o</sup>C
              ~ 
              {Math.floor(data.main.temp_max - 273.15)}
              <sup>o</sup>C
            </span>
            <span className="weather-main">{data.weather[0].main}</span>
            <img className="weather-icon" src={iconurl} alt="" srcset="" />
            <span className="weather-description-text">
              Description: 
            </span>
            <span className="weather-description">
              {" "}
              {data.weather[0].description}
            </span>
            
            <span className="weather-humidity-text">  
              Humidity:
            </span>   
            <span className="weather-humidity">
              {" "}
              {data.main.humidity} % 
            </span>

          </div>          
        </React.Fragment>
      ) : (
        <div className="maincard">
          <h2>{data.message}</h2>
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;
