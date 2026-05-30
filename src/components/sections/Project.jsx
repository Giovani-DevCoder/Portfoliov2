import { useEffect, useRef, useState } from "react"
import HoverAnimatedButton from "../HoverAnimatedButton"
import styles from "./project.module.css"

const delays = [0, 0.4, 0.6]
const totalTime = 1

function useOnScreen(options) {
  const ref = useRef()
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), options)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting]
}

const Project = ({ onOpenModal }) => {
  const [sectionRef, isVisible] = useOnScreen({ threshold: 1 })
  const [animate, setAnimate] = useState(false)
  const [showGreen, setShowGreen] = useState(false)
  const [showPink, setShowPink] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isVisible && !animate) {
      setAnimate(true)
      setTimeout(
        () => {
          setAnimationComplete(true)
        },
        (totalTime + Math.max(...delays)) * 500,
      )
      setTimeout(
        () => {
          setShowGreen(true)
          setShowPink(true)
        },
        (totalTime + Math.max(...delays)) * 500 + 25,
      )
    }
  }, [isVisible, animate])


  return (
    <section className="flex justify-center items-center min-h-screen" ref={sectionRef}>
      

      <div
        className={`h-[100vh] w-4xl grid grid-cols-3 place-items-center gap-5 relative ${
          !animationComplete ? styles.disabledInteractions : ""
        }`}
      >
        {/* Columna 1 */}
        <div className="w-full h-[70vh] flex flex-col gap-5">
            <button className={`relative overflow-hidden pointer-events-none transform scale-x-[-1] transition-all duration-1000 ease-in-out ${showGreen ? "h-1/2" : "h-full"}`}
            onClick={() => onOpenModal("")}>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src="/starsbackground.webm" type="video/webm" />
              </video>
                <HoverAnimatedButton
                  transparent={true}
                  src="/projectAstronauta.png"
                  animationDelay={`${delays[0]}s`}
                  animationDuration={`${totalTime - delays[0]}s`}
                  className={`${!animate ? styles.hiddenUntilVisible : ""} ${animate ? styles.colAnim : ""} animate-float-astronauta h-full`}
                
                />
                
            </button>

          <div className={`transition-all duration-1000 ease-in-out w-full ${showGreen ? "h-1/2" : "h-0"}`}>
            <button
              className="w-full h-full rounded-lg flex items-center justify-center text-xl font-bold overflow-hidden"
              style={{
                backgroundColor: "#333333",
                color: "#ffffff",
              }}
            >
              <span>PROYECTOS</span>
            </button>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="w-full h-[70vh] flex">
          <button onClick={() => onOpenModal("E-commerce")}>
            <HoverAnimatedButton
              src="/02.png"
              text="TIENDA VIRTUAL"
              animationDelay={`${delays[1]}s`}
              animationDuration={`${totalTime - delays[1]}s`}
              className={`${!animate ? styles.hiddenUntilVisible : ""} ${animate ? styles.colAnim : ""}`}
            />
          </button>
        </div>

        {/* Columna 3 */}
        <div
          className={`${!animate ? styles.hiddenUntilVisible : ""} w-full h-[70vh] flex flex-col relative overflow-hidden ${
            showPink ? "gap-5" : "gap-0"
          } ${animate ? styles.colAnim : ""}`}
          style={{ animationDuration: `${totalTime}s`, animationTimingFunction: "ease-out" }}
        >
            {/* Caja arriba */}
            <button 
              className={`transition-all duration-1000 ease-in-out w-full ${showPink ? "h-[calc(50%-10px)]" : "h-0"}`}
              onClick={() => onOpenModal("Transcriptor")}
            >
              <HoverAnimatedButton
                src="/01.png"
                text="TRANS CRIP TOR"
                animationDelay={`${delays[2]}s`}
                animationDuration={`${totalTime - delays[2]}s`}
                className={`${animate ? styles.colAnimFromTop : ""} h-full`}
              />
            </button>
          {/* Caja abajo */}
            <button
              className={`transition-all duration-1000 ease-in-out w-full ${showPink ? "h-[calc(50%-10px)]" : "h-full"}`}
              onClick={() => onOpenModal("Scripts")}
            >
              <HoverAnimatedButton
                src="/03.png"
                text="CLAU SELY"
                animationDelay={`${delays[2]}s`}
                animationDuration={`${totalTime - delays[2]}s`}
                className={`${animate ? styles.colAnim : ""} h-full`}
              />
            </button>
        </div>
      </div>
    </section>
  )
}

export default Project