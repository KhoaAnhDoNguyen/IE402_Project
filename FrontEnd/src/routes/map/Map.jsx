// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import { useLocation } from "react-router-dom";
// import "./Map.scss";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw"; // Replace with your Mapbox access token

// function Map() {
//   const mapContainer = useRef(null);
//   const location = useLocation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [map, setMap] = useState(null); // Store the map instance
//   const [routeLayerId] = useState("route"); // ID for the route layer

//   useEffect(() => {
//     // Get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     // Fetch properties from API
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/properties");
//         const data = await response.json();
//         setProperties(data);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   useEffect(() => {
//     const lat = new URLSearchParams(location.search).get("lat");
//     const lng = new URLSearchParams(location.search).get("lng");

//     if (lat && lng && currentLocation) {
//       const newMap = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [lng, lat],
//         zoom: 12,
//       });

//       setMap(newMap); // Set the map instance

//       // Add navigation controls
//       newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

//       // Add marker for current location
//       new mapboxgl.Marker({ color: "blue" })
//         .setLngLat([currentLocation.lng, currentLocation.lat])
//         .addTo(newMap);

//       // Add markers for each property
//       properties.forEach((property) => {
//         const marker = new mapboxgl.Marker({ color: "red" })
//           .setLngLat([property.longitude, property.latitude])
//           .addTo(newMap);

//         // Add click event to marker
//         marker.getElement().addEventListener("click", () => {
//           setSelectedProperty(property); // Set selected property
//         });
//       });

//       // Draw the route if both current location and destination are available
//       if (lat && lng) {
//         drawRoute(currentLocation.lng, currentLocation.lat, lng, lat, newMap);
//       }

//       return () => {
//         newMap.remove();
//       };
//     }
//   }, [location, currentLocation, properties]);

//   const drawRoute = async (startLng, startLat, endLng, endLat, map) => {
//     // Remove existing route if it exists
//     if (map.getLayer(routeLayerId)) {
//       map.removeLayer(routeLayerId);
//       map.removeSource(routeLayerId);
//     }

//     const response = await fetch(
//       `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
//     );
//     const data = await response.json();
//     if (data.routes.length > 0) {
//       const route = data.routes[0].geometry.coordinates;

//       // Add the new route to the map
//       map.addSource(routeLayerId, {
//         type: "geojson",
//         data: {
//           type: "Feature",
//           geometry: {
//             type: "LineString",
//             coordinates: route,
//           },
//         },
//       });

//       map.addLayer({
//         id: routeLayerId,
//         type: "line",
//         source: routeLayerId,
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "red",
//           "line-width": 6,
//         },
//       });
//     }
//   };

//   const handleCloseInfoPanel = () => {
//     setSelectedProperty(null);
//   };

//   const handleGetDirections = () => {
//     if (currentLocation && selectedProperty) {
//       drawRoute(
//         currentLocation.lng,
//         currentLocation.lat,
//         selectedProperty.longitude,
//         selectedProperty.latitude,
//         map
//       );
//     }
//   };

//   return (
//     <div style={{ display: "flex" }}>
//       <div
//         className="mapContainer"
//         ref={mapContainer}
//         style={{ height: "100vh", flex: 1 }}
//       />
//       {selectedProperty && (
//         <div
//           className="infoPanel"
//           style={{
//             width: "300px",
//             padding: "10px",
//             background: "white",
//             borderRadius: "5px",
//             boxShadow: "0 0 10px rgba(0,0,0,0.2)",
//             position: "absolute",
//             left: "10px",
//             top: "10px",
//           }}
//         >
//           <h3>{selectedProperty.name}</h3>
//           <img src={selectedProperty.images?.[0]?.image_url} />
//           {selectedProperty.bedroom}
//           {selectedProperty.bathroom}
//           {selectedProperty.price}

//           <p>
//             Location: {selectedProperty.latitude}, {selectedProperty.longitude}
//           </p>
//           <button onClick={handleGetDirections}>Chỉ đường</button>
//           <button onClick={handleCloseInfoPanel}>X</button>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Map;

// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import { useLocation } from "react-router-dom";
// import "./Map.scss";

// mapboxgl.accessToken =
//   "pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw";

// function Map() {
//   const mapContainer = useRef(null);
//   const location = useLocation();
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [properties, setProperties] = useState([]);
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         setCurrentLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/properties");
//         const data = await response.json();
//         setProperties(data);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   useEffect(() => {
//     if (currentLocation) {
//       const newMap = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [currentLocation.lng, currentLocation.lat],
//         zoom: 12,
//       });

//       setMap(newMap);

//       newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

//       new mapboxgl.Marker({ color: "blue" })
//         .setLngLat([currentLocation.lng, currentLocation.lat])
//         .addTo(newMap);

//       properties.forEach((property) => {
//         const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
//           <div class="infoPopup">
//             <img src="${
//               property.images?.[0]?.image_url || "placeholder.jpg"
//             }" alt="Property" class="infoPopup__image" />
//             <div class="infoPopup__details">
//               <h4 class="infoPopup__title">${property.name}</h4>
//               <p class="infoPopup__description">
//                 ${property.bedroom} bedroom<br />
//                 $${property.price}
//               </p>
//               <button class="infoPopup__button" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${
//                 property.latitude
//               },${property.longitude}', '_blank')">Chỉ đường</button>
//             </div>
//           </div>
//         `);

//         new mapboxgl.Marker({ color: "red" })
//           .setLngLat([property.longitude, property.latitude])
//           .setPopup(popup)
//           .addTo(newMap);
//       });

//       return () => {
//         newMap.remove();
//       };
//     }
//   }, [currentLocation, properties]);

//   return (
//     <div
//       className="mapContainer"
//       ref={mapContainer}
//       style={{ height: "100vh" }}
//     />
//   );
// }

// export default Map;

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useLocation } from "react-router-dom";
import "./Map.scss";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2hvYTIwMDMiLCJhIjoiY20yOGp4em0xMTQ5bTJrcHo2ZHpjaTExYSJ9.a0YJlfZTZXas3EQtWslMfw";

function Map() {
  const mapContainer = useRef(null);
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [properties, setProperties] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Get current location of the user
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
    // Fetch properties from API
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 12,
      });

      setMap(newMap);

      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add marker for current location
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .addTo(newMap);

      // Add markers for properties
      properties.forEach((property) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="infoPopup">
            <img src="${
              property.images?.[0]?.image_url || "placeholder.jpg"
            }" alt="Property" class="infoPopup__image" />
            <div class="infoPopup__details">
              <h4 class="infoPopup__title">${property.name}</h4>
              <p class="infoPopup__description">
                ${property.bedroom} phòng<br />
                ${property.price} VNĐ
              </p>
              <button class="infoPopup__button" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${
                property.latitude
              },${property.longitude}', '_blank')">Chỉ đường</button>
            </div>
          </div>
        `);

        // Add property marker with popup
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([property.longitude, property.latitude])
          .setPopup(popup)
          .addTo(newMap);
      });

      // Draw route if both current location and destination are available
      const lat = new URLSearchParams(location.search).get("lat");
      const lng = new URLSearchParams(location.search).get("lng");

      if (lat && lng) {
        drawRoute(currentLocation.lng, currentLocation.lat, lng, lat, newMap);
      }

      return () => {
        newMap.remove();
      };
    }
  }, [currentLocation, properties, location]);

  const drawRoute = async (startLng, startLat, endLng, endLat, map) => {
    const routeLayerId = "route";

    // Remove any existing route layer
    if (map.getLayer(routeLayerId)) {
      map.removeLayer(routeLayerId);
      map.removeSource(routeLayerId);
    }

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();

    if (data.routes.length > 0) {
      const route = data.routes[0].geometry.coordinates;

      map.addSource(routeLayerId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        },
      });

      map.addLayer({
        id: routeLayerId,
        type: "line",
        source: routeLayerId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red", // Line color set to red
          "line-width": 6,
        },
      });
    }
  };

  return (
    <div
      className="mapContainer"
      ref={mapContainer}
      style={{ height: "100vh" }}
    />
  );
}

export default Map;
