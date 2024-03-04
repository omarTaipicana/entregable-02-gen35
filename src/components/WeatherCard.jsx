import React, { useState } from "react";
import "./styles/WeatherCard.css";

const WeatherCard = ({ weather, temp, setInput, input, map, setMap }) => {
  const [scale, setScale] = useState(true);
  return (
    <article className="weather">
      <h1 className="weather__title">Weater App</h1>
      <h2 className="weather__country">
        {weather?.name}, {weather?.sys.country}
      </h2>
      <section className="weather__body">
        <header className="weather__img">
          <img
            className="weather__icon"
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            alt=""
          />
        </header>
        <div className="weather__condition">
          <h3 className="weather__description">
            {weather?.weather[0].description}
          </h3>
          <ul className="weather__list">
            <li className="weather__item">
              <span className="weather__label">Wind Speed: </span>
              <span className="weather__value">{weather?.wind.speed} %</span>
            </li>
            <li className="weather__item">
              <span className="weather__label">Clouds: </span>
              <span className="weather__value">{weather?.clouds.all} m/s</span>
            </li>
            <li className="weather__item">
              <span className="weather__label">Pressure: </span>
              <span className="weather__value">
                {weather?.main.pressure}.HPA
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section className="weather__principal">
        <h2 className="weather__temp">
          {scale ? temp?.cel : temp?.fah}
          {scale ? " °C" : " °F"}
        </h2>
      </section>
      <footer className="weather__footer">
        <button className="weather__btn" onClick={() => setInput(!input)}>
          Search city
        </button>
        <button className="weather__btn" onClick={() => setScale(!scale)}>
          Change Scale
        </button>
        <button className="weather__btn" onClick={() => setMap(!map)}>
          Map
        </button>
      </footer>
    </article>
  );
};

export default WeatherCard;
