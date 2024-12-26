import React, { useState, useEffect, useContext } from "react";
import RecentCard from "./RecentCard";
import { AuthContext } from "../../../context/AuthContext";
import "./recent.css";

const Recent = () => {
  const { currentUser } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        console.log("Fetching properties from API...");
        const response = await fetch("http://localhost:3000/api/properties");
        if (!response.ok) {
          throw new Error(`Error fetching properties: ${response.statusText}`);
        }
        const propertiesData = await response.json();
        console.log("Properties fetched:", propertiesData);
  
        // Fetch booked property IDs
        const bookedResponse = await fetch("http://localhost:3000/api/bookings");
        if (!bookedResponse.ok) {
          throw new Error(`Error fetching bookings: ${bookedResponse.statusText}`);
        }
        const bookedData = await bookedResponse.json();
        console.log(bookedData)
        const bookedPropertyIds = bookedData.map((booking) => booking.properties.id);
        console.log("Booked property IDs:", bookedPropertyIds);
  
        // Filter properties to exclude booked ones
        const availableProperties = propertiesData.filter(
          (property) => !bookedPropertyIds.includes(property.id)
        );
        console.log("Available properties:", availableProperties);
        setProperties(availableProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError(error.message);
      }
    };
  
    const fetchSavedList = async () => {
      if (!currentUser) return;
      try {
        console.log(`Fetching saved list for user ID: ${currentUser.id}`);
        const response = await fetch(
          `http://localhost:3000/api/favorites/${currentUser.id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching favorites: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Saved list fetched:", data);
        const savedPropertyIds = data.map((property) => property.id);
        console.log("Saved property IDs:", savedPropertyIds);
        setSavedList(savedPropertyIds);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError(error.message);
      }
    };
  
    fetchProperties();
    fetchSavedList();
  }, [currentUser]);

  const handleAddToSaved = async (propertyId) => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để thêm vào yêu thích!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, propertyId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add property to saved list");
      }

      const result = await response.json();
      console.log("Added to saved list:", result); // Log response after adding

      setSavedList((prev) => {
        const updatedList = [...prev, propertyId];
        console.log("Updated saved list:", updatedList); // Log updated list
        return updatedList;
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      setError(error.message);
    }
  };

  const handleRemoveFromSaved = async (propertyId) => {
    if (!currentUser) return;

    try {
      const response = await fetch("http://localhost:3000/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id, propertyId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove property from saved list");
      }

      const result = await response.json();
      console.log("Removed from saved list:", result); // Log response after removing

      setSavedList((prev) => {
        const updatedList = prev.filter((id) => id !== propertyId);
        console.log("Updated saved list after removal:", updatedList); // Log updated list
        return updatedList;
      });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError(error.message);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = properties.slice(startIndex, endIndex);

  console.log("Current items for this page:", currentItems); // Log items for the current page

  return (
    <section className="recent padding">
      <div className="container">
        <h1>Danh Sách Nhà Cho Thuê</h1>
        {error && <div className="error-message">{`Lỗi: ${error}`}</div>}
        <div className="recent-cards grid3">
          {currentItems.map((property) => (
            <RecentCard
              key={property.id}
              property={property}
              isLiked={savedList.includes(property.id)}
              onAddToSaved={handleAddToSaved}
              onRemoveFromSaved={handleRemoveFromSaved}
            />
          ))}
        </div>
        <div className="pagination flex">
          <button
            className="btn-pagination"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước đó
          </button>
          <span>Trang {currentPage}</span>
          <button
            className="btn-pagination"
            onClick={() =>
              setCurrentPage((prev) =>
                endIndex < properties.length ? prev + 1 : prev
              )
            }
            disabled={endIndex >= properties.length}
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recent;
