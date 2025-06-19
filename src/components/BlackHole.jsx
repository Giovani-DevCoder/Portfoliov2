import { useEffect, useRef, useState } from "react"

export default function EnhancedBlackHole({ coreImageWEBP, coreImagePNG, ringImageWEBP, ringImagePNG }) {
  const filterRef = useRef(null)
  const lastTimeRef = useRef(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Usamos un valor constante para la velocidad de rotación
  const ROTATION_SPEED = 0.00005 // Velocidad más lenta para un movimiento más suave

  // Usamos un estado para controlar la fase de la animación
  const phaseRef = useRef(0)

  useEffect(() => {
    // Función para animar con requestAnimationFrame usando timestamp
    const animate = (timestamp) => {
      const turbulence = filterRef.current?.querySelector("feTurbulence")
      const displacementMap = filterRef.current?.querySelector("feDisplacementMap")
      const turbulence2 = filterRef.current?.querySelector("#turbulence2")
      const displacementMap2 = filterRef.current?.querySelector("#displacementMap2")
      const turbulence3 = filterRef.current?.querySelector("#turbulence3")
      const displacementMap3 = filterRef.current?.querySelector("#displacementMap3")

      if (!turbulence || !displacementMap || !turbulence2 || !displacementMap2 || !turbulence3 || !displacementMap3)
        return

      // Calculamos el delta de tiempo para mantener una velocidad constante
      // independientemente de la frecuencia de refresco
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Incrementamos la fase de manera constante basada en el tiempo transcurrido
      phaseRef.current = (phaseRef.current + ROTATION_SPEED * deltaTime) % 1

      // Calculamos los valores de la distorsión basados en funciones sinusoidales
      // para crear un movimiento cíclico y fluido
      const sinValue = Math.sin(phaseRef.current * Math.PI * 2)
      const cosValue = Math.cos(phaseRef.current * Math.PI * 2)

      // Valores para la primera capa de distorsión (movimiento principal)
      const baseFreqX = 0.02 + Math.abs(sinValue) * 0.01
      const baseFreqY = 0.016 + Math.abs(cosValue) * 0.008
      const scale = 15 + Math.abs(sinValue) * 10 // Distorsión más intensa

      // Valores para la segunda capa de distorsión (detalle fino)
      const baseFreqX2 = 0.05 + Math.abs(cosValue) * 0.02
      const baseFreqY2 = 0.04 + Math.abs(sinValue) * 0.015
      const scale2 = 8 + Math.abs(cosValue) * 5

      // Valores para la tercera capa de distorsión (movimiento contrario)
      const baseFreqX3 = 0.03 + Math.abs(sinValue * cosValue) * 0.01
      const baseFreqY3 = 0.025 + Math.abs(sinValue + cosValue) * 0.01
      const scale3 = 12 + Math.abs(sinValue * cosValue) * 8

      turbulence.setAttribute("baseFrequency", `${baseFreqX} ${baseFreqY}`)
      turbulence.setAttribute("seed", (phaseRef.current * 100).toString())
      displacementMap.setAttribute("scale", scale.toString())

      turbulence2.setAttribute("baseFrequency", `${baseFreqX2} ${baseFreqY2}`)
      turbulence2.setAttribute("seed", ((phaseRef.current * 100 + 50) % 100).toString())
      displacementMap2.setAttribute("scale", scale2.toString())

      turbulence3.setAttribute("baseFrequency", `${baseFreqX3} ${baseFreqY3}`)
      turbulence3.setAttribute("seed", ((phaseRef.current * 100 + 25) % 100).toString())
      displacementMap3.setAttribute("scale", scale3.toString())

      requestAnimationFrame(animate)
    }

    if (isLoaded) {
      requestAnimationFrame(animate)
    }

    return () => {
      lastTimeRef.current = 0
    }
  }, [isLoaded])

  // Función para manejar la carga de imágenes
  const handleImagesLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      {/* Definición de filtros SVG optimizados con múltiples capas de distorsión */}
      <svg ref={filterRef} className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Primera capa de distorsión - Movimiento principal */}
          <filter id="distortion" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.016" numOctaves="3" seed="0" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displacement1"
            />
          </filter>

          {/* Segunda capa de distorsión - Detalle fino */}
          <filter id="distortion2" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence
              id="turbulence2"
              type="turbulence"
              baseFrequency="0.05 0.04"
              numOctaves="2"
              seed="50"
              result="noise2"
            />
            <feDisplacementMap
              id="displacementMap2"
              in="SourceGraphic"
              in2="noise2"
              scale="8"
              xChannelSelector="G"
              yChannelSelector="B"
              result="displacement2"
            />
          </filter>

          {/* Tercera capa de distorsión - Movimiento contrario */}
          <filter id="distortion3" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feTurbulence
              id="turbulence3"
              type="fractalNoise"
              baseFrequency="0.03 0.025"
              numOctaves="1"
              seed="25"
              result="noise3"
            />
            <feDisplacementMap
              id="displacementMap3"
              in="SourceGraphic"
              in2="noise3"
              scale="12"
              xChannelSelector="B"
              yChannelSelector="R"
              result="displacement3"
            />
          </filter>

          {/* Filtro combinado para aplicar todas las distorsiones */}
          <filter id="combinedDistortion" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feImage xlinkHref="#distortedRing" result="distorted1" />
            <feImage xlinkHref="#distortedRing2" result="distorted2" />
            <feImage xlinkHref="#distortedRing3" result="distorted3" />
            <feBlend mode="screen" in="distorted1" in2="distorted2" result="blended" />
            <feBlend mode="screen" in="blended" in2="distorted3" result="finalBlend" />
            <feComposite in="finalBlend" in2="SourceGraphic" operator="over" />
          </filter>

          {/* Efecto de brillo */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Efecto de desenfoque para suavizar bordes */}
          <filter id="softBlur" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      <div className="relative w-[min(50vw,500px)] h-[min(52.5vw,525px)]">
        {/* Aro del agujero negro con distorsión en múltiples capas */}
        <div
          id="distortedRing"
          className="absolute inset-0 z-10"
          style={{
            filter: "url(#distortion)",
            willChange: "filter",
            transform: "translateZ(0)",
          }}
        >
          <picture>
            <source srcSet={ringImageWEBP} type="image/webp" />
            <img
              src={ringImagePNG || "/placeholder.svg"}
              alt="Aro del agujero negro - capa 1"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
              onLoad={handleImagesLoaded}
              style={{ opacity: 0.9 }}
            />
          </picture>
        </div>

        {/* Segunda capa de distorsión */}
        

        {/* Tercera capa de distorsión */}
        <div
          id="distortedRing3"
          className="absolute inset-0 z-12"
          style={{
            filter: "url(#distortion3)",
            willChange: "filter",
            transform: "translateZ(0)",
            mixBlendMode: "lighten",
          }}
        >
          <picture>
            <source srcSet={ringImageWEBP} type="image/webp" />
            <img
              src={ringImagePNG || "/placeholder.svg"}
              alt="Aro del agujero negro - capa 3"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
              style={{ opacity: 0.6 }}
            />
          </picture>
        </div>

        {/* Efecto de brillo adicional */}
      

        {/* Núcleo del agujero negro (sin distorsión) */}
        <div className="absolute inset-0 z-20">
          <picture>
            <source srcSet={coreImageWEBP} type="image/webp" />
            <img
              src={coreImagePNG || "/placeholder.svg"}
              alt="Núcleo del agujero negro"
              className="w-full h-full object-contain"
              loading="eager"
              onLoad={handleImagesLoaded}
            />
          </picture>
        </div>
      </div>
    </div>
  )
}