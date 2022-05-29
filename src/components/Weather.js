import React, { Component, useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "a27f51e2a3623033d718fd4e052e1b15";
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
      addToSearchHistory({ data: data });
      
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };

  
  const addToSearchHistory = () => {
    let recent = this.state.recent;
    recent.push({
      city: this.state.city,
      country: this.state.country,
    });
    this.setState({ recent }, () => {
       window.localStorage.setItem("recent", JSON.stringify(this.state.recent));
    });
  }

  const componentDidMount = () =>{
    const data = window.localStorage.getItem("recent");
    this.setState({ recent: JSON.parse(data) });
  }
  

  return (
    <div className="weather">
      <span className="title">Today's Weather</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Search
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
