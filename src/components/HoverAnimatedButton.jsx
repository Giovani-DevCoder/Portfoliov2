import React from "react"
import styles from "./sections/project.module.css"

const HoverAnimatedButton = ({
  src,
  text,
  transparent,
  className = "",
  style = {},
  animationDelay = "0s",
  animationDuration = "0.8s",
}) => {
  return (
    <button
      className={`${styles.projectCard} ${transparent ? "bg-transparent" : "bg-zinc-700"} relative overflow-hidden w-full h-full filter grayscale-75 hover:grayscale-0 rounded-lg flex items-center justify-center text-xl font-bold cursor-pointer ${className}`}
      style={{
        animationDelay,
        animationDuration,
        ...style,
      }}
    >
      <img
        src={src}
        className="w-full h-full z-20 object-contain duration-300 ease-out hover:scale-140 hover:-translate-x-12 hover:translate-y-12 right-20"
      />

      <div className={styles.textHoverWrapper}>
        <span className={styles.textHoverAnimation}>{text}</span>
      </div>
    </button>
  )
}

export default HoverAnimatedButton
