import React, { useState } from "react";
import "./WeatherSearch.css";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import { Dna } from "react-loader-spinner";

const weatherIcons = {
  "01d": "CLEAR_DAY",
  "01n": "CLEAR_NIGHT",
  "02d": "PARTLY_CLOUDY_DAY",
  "02n": "PARTLY_CLOUDY_NIGHT",
  "03d": "CLOUDY",
  "03n": "CLOUDY",
  "04d": "CLOUDY",
  "04n": "CLOUDY",
  "09d": "RAIN",
  "09n": "RAIN",
  "10d": "RAIN",
  "10n": "RAIN",
  "11d": "RAIN",
  "11n": "RAIN",
  "13d": "SNOW",
  "13n": "SNOW",
  "50d": "FOG",
  "50n": "FOG"
};

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  function showProps(response) {
    let temp = "Temperature: " + Math.round(response.data.main.temp) + "C";
    let descrip = "Description: " + response.data.weather[0].description;
    let humidity = "Humidity: " + Math.round(response.data.main.humidity) + "%";
    let wind = "Wind: " + Math.round(response.data.wind.speed) + " Km/h";
    let iconCode = response.data.weather[0].icon;
    let icon = (
      <ReactAnimatedWeather
        icon={weatherIcons[iconCode]}
        color="#7F8EF4"
        size={100}
        animate={true}
      />
    );
    let arrayWeather = [temp, descrip, humidity, wind, icon];
    setMessage(arrayWeather);
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then(showProps);
  }

  function citySearch(event) {
    setCity(event.target.value);
  }

  const ShowBody = () => {
    if (message.length === 0 || loading) {
      return (
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      );
    } else {
      return (
        <div>
          <ul>
            {message.map((props, index) => {
              return <li key={index}>{props}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="Forms">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="form__field"
          placeholder="Enter the city"
          onChange={citySearch}
        />
        <input
          type="submit"
          className="btn btn--primary btn--inside uppercase"
          value="Search"
        />
      </form>

      <ShowBody />
    </div>
  );
}
