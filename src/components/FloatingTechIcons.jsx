import { useEffect, useRef, useState } from "react"
import { SiNodedotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress, SiDocker, SiJavascript } from "react-icons/si"

const FloatingTechIcons = () => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [icons, setIcons] = useState([])
  const animationRef = useRef()
  const lastTimeRef = useRef(0)

  const techIcons = [
    {
      Icon: SiNodedotjs,
      name: "Node.js",
      baseX: -180,
      baseY: -120,
      size: 64,
      floatRange: 2,
      floatSpeed: 0.024,
    },
    {
      Icon: SiTailwindcss,
      name: "Tailwind",
      baseX: 200,
      baseY: 30,
      size: 38,
      floatRange: 2.5,
      floatSpeed: 0.028,
    },
    {
      Icon: SiPostgresql,
      name: "PostgreSQL",
      baseX: -220,
      baseY: -40,
      size: 51,
      floatRange: 1.8,
      floatSpeed: 0.035,
    },
    {
      Icon: SiMongodb,
      name: "MongoDB",
      baseX: 160,
      baseY: -150,
      size: 41,
      floatRange: 2.2,
      floatSpeed: 0.028,
    },
    {
      Icon: SiExpress,
      name: "Express",
      baseX: -120,
      baseY: -200,
      size: 44,
      floatRange: 1.5,
      floatSpeed: 0.028,
    },
    {
      Icon: SiDocker,
      name: "Docker",
      baseX: 258,
      baseY: -65,
      size: 50,
      floatRange: 2.3,
      floatSpeed: 0.028,
    },
    {
      Icon: SiJavascript,
      name: "JavaScript",
      baseX: 65,
      baseY: -170,
      size: 51,
      floatRange: 2,
      floatSpeed: 0.028,
    },
  ]

  useEffect(() => {
    const initialIcons = techIcons.map((tech, index) => ({
      ...tech,
      id: index,
      currentX: tech.baseX,
      currentY: tech.baseY,
      offsetX: 0,
      offsetY: 0,
      floatPhase: Math.random() * Math.PI * 2,
      isRepelling: false,
    }))
    setIcons(initialIcons)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePos({
        x: e.clientX - centerX,
        y: e.clientY - centerY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (icons.length === 0) return

    const animate = (timestamp) => {
      const deltaTime = lastTimeRef.current ? timestamp - lastTimeRef.current : 4
      lastTimeRef.current = timestamp

      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          const newFloatPhase = icon.floatPhase + icon.floatSpeed * (deltaTime / 16)

          const floatX = Math.cos(newFloatPhase) * icon.floatRange
          const floatY = Math.sin(newFloatPhase * 0.5) * icon.floatRange * 0.4

          const baseWithFloatX = icon.baseX + floatX
          const baseWithFloatY = icon.baseY + floatY

          // Línea corregida:
          const distanceToMouse = Math.sqrt(
            Math.pow(mousePos.x - baseWithFloatX, 2) + Math.pow(mousePos.y - baseWithFloatY, 2)
          );
          let offsetX = 0
          let offsetY = 0
          let isRepelling = false
          
          if (distanceToMouse < 100) {
            isRepelling = true
            const repelForce = Math.max(0, (100 - distanceToMouse) / 100)
            const angle = Math.atan2(baseWithFloatY - mousePos.y, baseWithFloatX - mousePos.x)

            offsetX = Math.cos(angle) * repelForce * 50
            offsetY = Math.sin(angle) * repelForce * 50
          }

          const smoothFactor = 0.06
          const targetOffsetX = isRepelling ? offsetX : 0
          const targetOffsetY = isRepelling ? offsetY : 0

          const smoothOffsetX = icon.offsetX + (targetOffsetX - icon.offsetX) * smoothFactor
          const smoothOffsetY = icon.offsetY + (targetOffsetY - icon.offsetY) * smoothFactor

          return {
            ...icon,
            floatPhase: newFloatPhase,
            currentX: baseWithFloatX + smoothOffsetX,
            currentY: baseWithFloatY + smoothOffsetY,
            offsetX: smoothOffsetX,
            offsetY: smoothOffsetY,
            isRepelling,
          }
        })
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [icons.length, mousePos])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-15"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icons.map((icon) => {
        const Icon = icon.Icon
        return (
          <div
            key={icon.id}
            className="absolute transition-all duration-300 ease-out"
            style={{
              transform: `translate(${icon.currentX}px, ${icon.currentY}px)`,
              opacity: icon.isRepelling ? 0.9 : 0.8,
              filter: icon.isRepelling
                ? "brightness(1.3) drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))"
                : "brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
            }}
          >
            <Icon
              size={icon.size}
              className="text-white"
              style={{
                transform: `rotate(${Math.sin(icon.floatPhase) * 1}deg)`,
                transition: "transform 1.5s ease-out",
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default FloatingTechIcons