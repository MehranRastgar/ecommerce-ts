import { useEffect, useState } from "react";
import L, { LatLngExpression } from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const { MapContainer, useMapEvents, useMap, useMapEvent } = ReactLeaflet;

const Map = ({
  children,
  className,
  center,
  zoom,
  setAddress,
}: {
  children: any;
  className: any;
  center: LatLngExpression | undefined;
  zoom: any;
  setAddress: any;
}) => {
  let mapClassName = styles.map;
  const [centerOnClick, setCenterOnClick] = useState<LatLngExpression>({
    lat: 35.774371784708535,
    lng: 51.348438729135204,
  });
  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  function MyComponent() {
    const map = useMapEvent("drag", () => {
      setCenterOnClick(map.getCenter());
      setAddress(map.getCenter());
      console.log(centerOnClick);
    });
    const map2 = useMapEvent("zoomend", () => {
      setCenterOnClick(map2.getCenter());
      setAddress(map2.getCenter());
      console.log(centerOnClick);
    });
    console.log("location found:ddd");

    return null;
  }
  useEffect(() => {
    (async function init() {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} center={centerOnClick} zoom={zoom}>
      <MyComponent />
      {children(ReactLeaflet)}
    </MapContainer>
  );
};

export default Map;
