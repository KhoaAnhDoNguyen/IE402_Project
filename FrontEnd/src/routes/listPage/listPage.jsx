import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import "./listPage.scss";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw'; // Replace with your Mapbox access token

function ListPage() {
  const location = useLocation();
  const initialProperties = Array.isArray(location.state?.properties) ? location.state.properties : [];
  const [properties, setProperties] = useState(initialProperties);
  const mapContainer = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: currentLocation ? [currentLocation.lng, currentLocation.lat] : [0, 0],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for filtered properties
    if (Array.isArray(properties)) {
      properties.forEach(property => {
        if (property.longitude && property.latitude) {
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([property.longitude, property.latitude])
            .addTo(map);
        }
      });
    } else {
      console.error("Properties is not an array:", properties);
    }

    return () => {
      map.remove();
    };
  }, [currentLocation, properties]);

  useEffect(() => {
    if (Array.isArray(location.state?.properties)) {
      setProperties(location.state.properties);
    } else {
      setProperties([]); // Optional: reset to an empty array if not valid
    }
  }, [location.state]);

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter setFilteredProperties={setProperties} />
          <div>
            {properties.length > 0 ? (
              properties.map((property) => (
                <Card key={property.id} item={property} />
              ))
            ) : (
              <p>Không có kết quả phù hợp.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mapContainer" ref={mapContainer} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}

export default ListPage;