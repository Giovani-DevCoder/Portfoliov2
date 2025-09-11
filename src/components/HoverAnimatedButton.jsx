// components/HoverAnimatedButton.jsx
import React from "react"
import styles from "./sections/project.module.css" // Ajusta la ruta si es necesario

const HoverAnimatedButton = ({
  videoSrc,
  text,
  className = "",
  style = {},
  animationDelay = "0s",
  animationDuration = "0.8s",
}) => {
  return (
    <button
      className={`${styles.projectCard} relative overflow-hidden w-full h-full rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer ${className}`}
      style={{
        animationDelay,
        animationDuration,
        ...style,
      }}
    >
      {/* Texto animado */}
      <div className={styles.textHoverWrapper}>
        <span className={styles.textHoverAnimation}>{text}</span>
      </div>

      {/* Video de fondo */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover filter grayscale-75 transition-all duration-300 hover:grayscale-0"
      />
    </button>
  )
}

export default HoverAnimatedButton
