import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import "./styles/Input.css";

const InputCountry = ({ setWeather, setTemp, weather, setCoordsMap }) => {
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const APIKEY = "5b0660ff99ab1982109177a3b0d41476";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName?cityName:"latacunga"}&appid=${APIKEY}`;
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        const celsius = (res.data.main.temp - 273.15).toFixed(2);
        const fahrenheit = ((9 / 5) * celsius + 32).toFixed(2);
        setTemp({
          cel: celsius,
          fah: fahrenheit,
        });
        setCoordsMap({
          lat: res.data?.coord.lat,
          lon: res.data?.coord.lon,
        });
      })
      .catch((err) => console.log(err));
  }, [cityName]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputSearch.current.value.trim();
    setCityName(value);
  };

  return (
    <form className="form__card" onSubmit={handleSubmit}>
      <label className="form__label" htmlFor="city">
        City:
      </label>
      <input
        placeholder="Ingrese el nombre de la ciudad"
        onClick={() => (inputSearch.current.value = "")}
        ref={inputSearch}
        id="city"
        type="text"
      />
      {<button className="weather__btn"> SEARCH </button>}
    </form>
  );
};

export default InputCountry;
