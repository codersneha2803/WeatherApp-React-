import  { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/clouds.png';
import drizzle_icon from '../Assets/drizzle.png';
import fog_icon from '../Assets/fog.png';
import humidity_icon from '../Assets/humidity.png';
import wind_icon from '../Assets/wind.png';
import snow_icon from '../Assets/snow.png';
import rain_icon from '../Assets/rain.png';

const WeatherApp = () => {
  const apiKey = "c98f6b6d0bcc8af69a72af3ba253b970";
  const [wicon, setWicon] = useState(clear_icon);

  const search = async () => {
    const element = document.getElementById("cityInput");

    if (element.value === "") {
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.main) {
        const humidity = document.getElementsByClassName("H-percentage");
        const wind = document.getElementsByClassName("W-Speed");
        const temperature = document.getElementsByClassName("temp");
        const location = document.getElementsByClassName("city");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = data.wind.speed + " Km/Hr";
        temperature[0].innerHTML = data.main.temp + "°C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
          setWicon(cloud_icon);
        } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
          setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
          setWicon(rain_icon);
        } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
          setWicon(rain_icon);
        } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
          setWicon(snow_icon);
        } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
          setWicon(fog_icon);
        } else {
          setWicon(clear_icon);
        }
      } else {
        console.error("Invalid data received from the API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search();
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          id='cityInput'
          placeholder='Enter the city Name'
          onKeyDown={handleKeyPress}
        />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="Search Icon" />
        </div>
      </div>
      <div className="weather-img">
        <img src={wicon} alt="Weather Icon" />
      </div>
      <div className="temp">28°C</div>
      <div className="city">Nagpur</div>
      <div className="details">
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon" className="icon" />
          <div className="data">
            <div className="H-percentage">50%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="W-Speed">20 Km/Hr</div>
            <div className="text">Wind</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
