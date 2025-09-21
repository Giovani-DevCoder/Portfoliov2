import { useEffect, useRef, useState } from "react"
import { SiNodedotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiExpress, SiDocker, SiJavascript } from "react-icons/si"

const FloatingTechIcons = () => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [icons, setIcons] = useState([])
  const [screenSize, setScreenSize] = useState('desktop')
  const animationRef = useRef()
  const lastTimeRef = useRef(0)

  const [isLightMode, setIsLightMode] = useState(document.body.classList.contains("light-mode"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 1024) {
        setScreenSize('mobile')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const getResponsiveConfig = () => {
    const configs = {
      mobile: {
        iconCount: 7,
        basePositions: [
          { baseX: -100, baseY: -50, size: 20 },
          { baseX: 120, baseY: 20, size: 18 },
          { baseX: -120, baseY: -10, size: 22 },
          { baseX: 70, baseY: -70, size: 19 },
          { baseX: -60, baseY: -80, size: 22 },
          { baseX: 155, baseY: -30, size: 23 },
          { baseX: 30, baseY: -90, size: 24 }
        ],
        floatRange: 1,
        repelDistance: 40
      },
      desktop: {
        iconCount: 7,
        basePositions: [
          { baseX: -180, baseY: -120, size: 64 },
          { baseX: 200, baseY: 30, size: 38 },
          { baseX: -220, baseY: -40, size: 51 },
          { baseX: 160, baseY: -150, size: 41 },
          { baseX: -120, baseY: -200, size: 44 },
          { baseX: 258, baseY: -65, size: 50 },
          { baseX: 65, baseY: -170, size: 51 }
        ],
        floatRange: 2.5,
        repelDistance: 100
      }
    }
    return configs[screenSize]
  }

  const techIcons = [
    { Icon: SiNodedotjs, name: "Node.js" },
    { Icon: SiTailwindcss, name: "Tailwind" },
    { Icon: SiPostgresql, name: "PostgreSQL" },
    { Icon: SiMongodb, name: "MongoDB" },
    { Icon: SiExpress, name: "Express" },
    { Icon: SiDocker, name: "Docker" },
    { Icon: SiJavascript, name: "JavaScript" },
  ]

  useEffect(() => {
    const config = getResponsiveConfig()
    const initialIcons = techIcons.slice(0, config.iconCount).map((tech, index) => {
      const position = config.basePositions[index]
      return {
        ...tech,
        id: index,
        baseX: position.baseX,
        baseY: position.baseY,
        size: position.size,
        currentX: position.baseX,
        currentY: position.baseY,
        offsetX: 0,
        offsetY: 0,
        floatPhase: Math.random() * Math.PI * 2,
        floatRange: config.floatRange,
        floatSpeed: 0.024 + Math.random() * 0.01,
        isRepelling: false,
      }
    })
    setIcons(initialIcons)
  }, [screenSize])

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

    const config = getResponsiveConfig()

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

          const distanceToMouse = Math.sqrt(
            Math.pow(mousePos.x - baseWithFloatX, 2) + Math.pow(mousePos.y - baseWithFloatY, 2)
          );
          
          let offsetX = 0
          let offsetY = 0
          let isRepelling = false
          
          if (distanceToMouse < config.repelDistance) {
            isRepelling = true
            const repelForce = Math.max(0, (config.repelDistance - distanceToMouse) / config.repelDistance)
            const angle = Math.atan2(baseWithFloatY - mousePos.y, baseWithFloatX - mousePos.x)

            const repelStrength = screenSize === 'mobile' ? 25 : 50
            offsetX = Math.cos(angle) * repelForce * repelStrength
            offsetY = Math.sin(angle) * repelForce * repelStrength
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
  }, [icons.length, mousePos, screenSize])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-15 overflow-hidden"
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
              opacity: icon.isRepelling ? 0.9 : 0.6,
              filter: icon.isRepelling
                ? "brightness(1.3) drop-shadow(0 0 12px rgba(255, 255, 255, 0.5))"
                : "brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
            }}
          >
            <Icon
              size={icon.size}
              className={isLightMode ? "text-black" : "text-white"}
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