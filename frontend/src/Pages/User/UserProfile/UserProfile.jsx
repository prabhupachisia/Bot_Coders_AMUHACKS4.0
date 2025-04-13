import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        setErrorMessage("No user data found in local storage.");
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      setErrorMessage("Failed to load user data from local storage.");
      console.error(error);
    }
  }, []);

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
