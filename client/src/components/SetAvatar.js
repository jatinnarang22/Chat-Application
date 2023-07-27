import React, { useState, useEffect } from "react";
import avatars from "./Avatars";
import "../style/SetAvatar.css";
import loadingImage from "../assets/loader.gif" 

function getRandomUniqueIndices(max, count) {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * max));
  }
  return Array.from(indices);
}

function SetAvatar() {
  const [loading, setLoading] = useState(true);
  const [randomAvatarIndices, setRandomAvatarIndices] = useState([]);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      
      const newIndices = getRandomUniqueIndices(avatars.length, 4);
      localStorage.setItem("randomAvatarIndices", JSON.stringify(newIndices));
      setRandomAvatarIndices(newIndices);
      setLoading(false);
    }, 3000);
  }, []);
  const handleAvatarSelection = (index) => {
    setSelectedAvatarIndex(index);
  };

  return (
    <div className="container">
      {loading ? ( // Display the loader if `loading` state is true
        <div className="loader">
        <img src={loadingImage} alt="Loading..." />
      </div>
      ) : (
        <React.Fragment> {/* Your main content */}
      <div className="title-container">
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div className="avatars">
        {randomAvatarIndices.map((index) => (
          <img 
          className={`Avatar ${index + 1}`}
           key={index} src={avatars[index]}
            alt={`Avatar ${index + 1}`}
            onClick={() => handleAvatarSelection(index)}
            style={{
              border: selectedAvatarIndex === index ? " 0.4rem solid #4e0eff" : "none",
            }} />
        ))}
      </div>
      <button  className="submit-btn">
        Set as Profile Picture
      </button>
      </React.Fragment>
      )}
    </div>

  );
}

export default SetAvatar;
