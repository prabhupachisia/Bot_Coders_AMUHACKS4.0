import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  
  // Memoize getUserProfile using useCallback to avoid redefinition on every render
  const getUserProfile = useCallback(async () => {
    try {
      // Send request to the backend to fetch the user profile
      const response = await axios.get("http://localhost:5000/v1/users/profile", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage("You don't have permission to access this resource.");
      } else {
        setErrorMessage("Failed to load user profile");
      }
      console.error(error);
    }
  }, [accessToken]); // Depend on accessToken

  // Memoize refreshAccessToken using useCallback to avoid redefinition on every render
  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      setErrorMessage("No refresh token found.");
      return;
    }

    try {
      // Send request to refresh the access token using the refresh token
      const response = await axios.post("http://localhost:5000/v1/auth/refresh-tokens", { refreshToken });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      
      // Update tokens in state and localStorage
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      setAccessToken(newAccessToken); // This will trigger useEffect
      localStorage.setItem("accessTokenExpiration", new Date(Date.now() + 3600 * 1000));
      
      // Explicitly call getUserProfile with new token
      await axios.get("http://localhost:5000/v1/users/profile", {
        headers: { Authorization: `Bearer ${newAccessToken}` }
      }).then(res => setUser(res.data))
        .catch(err => {
          setErrorMessage("Failed to load user profile after refresh");
          console.error(err);
        });
    } catch (error) {
      setErrorMessage("Failed to refresh token");
      console.error(error);
    }
  }, []); // Ensure the memoized version is used

  useEffect(() => {
    // Check if access token has expired
    const tokenExpiration = localStorage.getItem("accessTokenExpiration");
    if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
      refreshAccessToken();
    } else if (accessToken) {
      getUserProfile();
    }
  }, [accessToken, getUserProfile, refreshAccessToken]);  // Add these dependencies to ensure proper rerendering

  return (
    <div>
      <h1>User Profile</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {user ? (
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfile;
