import { useState, useEffect } from "react"
import { projectData } from "./ProjectsData"

const CircleTransitionModal = ({ open, onClose, children }) => {
  const [showContent, setShowContent] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const projectInfo = projectData[children];

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [children])

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [open])

  // Función para navegar entre imágenes
  const goToSlide = (index) => {
    setCurrentImageIndex(index)
  }

  // Función para siguiente imagen
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % projectInfo.images.length
    )
  }

  // Función para imagen anterior
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + projectInfo.images.length) % projectInfo.images.length
    )
  }

  useEffect(() => {
    setCurrentImageIndex(0)
    setIsAutoPlaying(true) // Reactivar auto-play al cambiar de proyecto
  }, [children])

  useEffect(() => {
    let interval
    
    if (open && isAutoPlaying && projectInfo?.images?.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % projectInfo.images.length
        )
      }, 3000) // Cambia cada 3 segundos
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [open, isAutoPlaying, projectInfo?.images?.length])

  return (
    <div className={`fixed inset-0 z-[9999] pointer-events-none`} style={{ overflow: "hidden" }}>
      {/* Círculo de expansión - Solo efecto visual */}
      <div
        className={`absolute top-1/2 left-0 bg-neutral-800 rounded-full transition-[width,height,transform] duration-700 ease-in-out
          ${open ? "w-[200vw] h-[200vh] -translate-y-1/2 -translate-x-1/2" : "w-32 h-32 -translate-y-1/2 -translate-x-1/2"}
        `}
        style={{ pointerEvents: "none" }}
      />

      {/* Contenido independiente centrado en el viewport */}
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-auto"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div
            className={`relative transition-all duration-500 ease-out
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{
              width: "80vw",
              height: "80vh",
              maxWidth: "1200px",
              maxHeight: "800px",
            }}
          >
            {/* Botón de cerrar */}
            <button
              className="absolute -top-3 -right-3 bg-white rounded-full w-12 h-12 flex items-center justify-center text-black text-xl font-bold shadow-lg hover:bg-gray-100 transition-all duration-200 hover:scale-110 z-10"
              onClick={onClose}
            >
              ×
            </button>

            {/* Contenido principal */}
            <div className="text-white h-full w-full p-8 overflow-auto">
              <div
                className={`h-full transition-all duration-700 delay-100 ease-out
                  ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                <h2 className="text-2xl font-bold mb-4">{projectInfo.title}</h2>
                <p className="text-gray-700 mb-6">{projectInfo.description}</p>

                {/* Carrusel de imágenes */}
                {projectInfo.images && projectInfo.images.length > 0 && (
                  <div className="mb-6">
                    <div className="relative w-2xl h-64 md:h-48 overflow-hidden rounded-xl bg-gray-100 mb-4">
                      <img
                        src={projectInfo.images[currentImageIndex]}
                        alt={`${projectInfo.title} - Imagen ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover transition-opacity duration-500"
                      />
                      
                      {/* Botones de navegación */}
                      {projectInfo.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            ‹
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {/* Indicadores de imágenes */}
                    {projectInfo.images.length > 1 && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {projectInfo.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${
                              currentImageIndex === index 
                                ? 'bg-neutral-500' 
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CircleTransitionModal