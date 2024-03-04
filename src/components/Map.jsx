import React, { useRef, useEffect } from "react";
import "./styles/Map.css";

const Map = ({ setCoords, coords, coordsMap, setCoordsMap }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (coordsMap || coords) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: coordsMap ? coordsMap.lat : coords.lat,
          lng: coordsMap ? coordsMap.lon : coords.lon,
        },
        zoom: 12,
      });

      map.addListener("click", (e) => {
        setCoords({
          lat: e.latLng.lat(),
          lon: e.latLng.lng(),
        });
        setCoordsMap({
          lat: e.latLng.lat(),
          lon: e.latLng.lng(),
        });
      });
    }
  }, [coords, coordsMap]);

  return (
    <div
      className="map__card"
      ref={mapRef}
      style={{ width: "100%", height: "400px" }}
    ></div>
  );
};

export default Map;
