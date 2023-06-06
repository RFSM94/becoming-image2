import React, { useState } from 'react';
import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  const [showAbout, setShowAbout] = useState(false);

  const handlePlayButtonClick = () => {
    setPlay(true);
  };

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
  };

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div className={`loader ${progress === 100 ? "loader--disappear" : ""}`} />

      <button className="about-btn" onClick={handleAboutClick}>
        About
      </button>

      <div className={`about ${showAbout ? "about--visible" : ""}`}>
        <h2>About Content</h2>
        <p>Some about content...</p>
      </div>

      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">Becoming-Image</h1>
          <h2 className="sublogo">If our distant reality is mediated by digitized images, how does it look based on the most searched encyclopedic website?</h2>
          <h2 className="subsublogo">Here you’ll find the images associated with the most searched contents in Wikipedia worldwide, “shedding light on what the world is thinking about”.</h2>
          <p className="intro__scroll">Scroll to begin</p>
          <button className="explore" onClick={handlePlayButtonClick}>Explore</button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Want to know <a href="https://www.google.pt">more</a>?</p>
      </div>
    </div>
  );
};
