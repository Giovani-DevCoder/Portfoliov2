import {React, useState, useEffect } from 'react';
import styles from "./sections/project.module.css"

const HoverAnimatedButton = ({
  src,
  text,
  transparent,
  className = "",
  style = {},
  animationDelay = "0s",
  animationDuration = "0.8s",
  showVideo = false,
}) => {


  return (
    <button
      className={`${styles.projectCard} bg-zinc-700 relative overflow-hidden w-full h-full filter grayscale-75 hover:grayscale-0 rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer ${className}`}
      style={{
        animationDelay,
        animationDuration,
        ...style,
      }}
    >

      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        >
          <source src="/starsbackground.webm" type="video/webm" />
        </video>
      )}
          <img
            src={src}
            className="w-full h-full z-20 object-contain duration-300 ease-out hover:scale-140 hover:-translate-x-12 hover:translate-y-12 right-20"
          />

      <div className={styles.textHoverWrapper}>
        <span className={styles.textHoverAnimation}>{text}</span>
      </div>
    </button>
  );
};
export default HoverAnimatedButton
