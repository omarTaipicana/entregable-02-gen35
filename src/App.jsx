import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import IsLoading from "./components/IsLoading";
import ErrorCard from "./components/ErrorCard";
import InputCountry from "./components/InputCountry";
import Map from "./components/Map";

function App() {
  const [coords, setCoords] = useState();
  const [coordsMap, setCoordsMap] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [handleError, setHandleError] = useState(true);
  const [input, setInput] = useState(true);
  const [map, setMap] = useState(true);

  const success = (info) => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude,
    });
  };
  const error = () => {
    setHandleError(false);
    setIsLoading(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (coords) {
      const APIKEY = "5b0660ff99ab1982109177a3b0d41476";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;
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
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [coords]);

  return (
    <div className="app">
      <article className="app__card">
        {handleError ? <></> : <ErrorCard />}
        {isLoading ? (
          <IsLoading />
        ) : (
          <WeatherCard
            weather={weather}
            temp={temp}
            setInput={setInput}
            input={input}
            map={map}
            setMap={setMap}
          />
        )}

        {input ? (
          <></>
        ) : (
          <InputCountry
            setCoordsMap={setCoordsMap}
            setWeather={setWeather}
            weather={weather}
            setTemp={setTemp}
          />
        )}
      </article>

      {map ? (
        <></>
      ) : (
        <Map
          coords={coords}
          setCoords={setCoords}
          coordsMap={coordsMap}
          setCoordsMap={setCoordsMap}
        />
      )}
    </div>
  );
}

export default App;
