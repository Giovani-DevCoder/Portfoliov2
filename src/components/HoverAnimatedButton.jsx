import React from "react"
import styles from "./sections/project.module.css"

const HoverAnimatedButton = ({
  src,
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
      <div className={styles.textHoverWrapper}>
        <span className={styles.textHoverAnimation}>{text}</span>
      </div>

      <img
        src={src}
        className="w-full h-full object-contain right-20 filter bg-zinc-700 grayscale-75 transition-all duration-300 hover:grayscale-0 hover:opacity-60"
      />
    </button>
  )
}

export default HoverAnimatedButton
