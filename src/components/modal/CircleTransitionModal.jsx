import { useState, useEffect } from "react"
import { projectData } from "./ProjectsData"
import CardsSectionModal from "./CardsSectionModal"
import { techIcons } from "./Icons";
import { IoCloseCircle } from "react-icons/io5";


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

  const goToSlide = (index) => {
    setCurrentImageIndex(index)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % projectInfo.images.length
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + projectInfo.images.length) % projectInfo.images.length
    )
  }

  useEffect(() => {
    setCurrentImageIndex(0)
    setIsAutoPlaying(true)
  }, [children])

  useEffect(() => {
    let interval
    
    if (open && isAutoPlaying && projectInfo?.images?.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % projectInfo.images.length
        )
      }, 6000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [open, isAutoPlaying, projectInfo?.images?.length])

const renderIcon = () => {
    const iconSize = "w-4 h-4 lg:w-6 lg:h-6"
    switch (type) {
      case "github":
        return <Github className={`${iconSize} text-white`} />

      default:
        return null
    }
  }

  return (
    <div className={`fixed inset-0 z-[9999] pointer-events-none`} style={{ overflow: "hidden" }}>
      <div
        className={`absolute top-1/2 left-0 bg-zinc-900 rounded-full transition-[width,height,transform] duration-700 ease-in-out
          ${open ? "w-[200vw] h-[200vh] -translate-y-1/2 -translate-x-1/2" : "w-32 h-32 -translate-y-1/2 -translate-x-1/2"}
        `}
        style={{ pointerEvents: "none" }}
      />

      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center pointer-events-auto"
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div
            className={`relative transition-all duration-500 ease-out rounded-2xl border-2 border-zinc-300
              ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
            style={{
              width: "80vw",
              height: "80vh",
              maxWidth: "1200px",
              maxHeight: "800px",
            }}
          >
            <IoCloseCircle
              className="absolute top-4 right-4 rounded-full w-10 h-10 shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 z-10"
              onClick={onClose}
            />
            <div className="text-white h-full w-full p-8 overflow-auto">
              <div
                className={`h-full transition-all duration-700 delay-100 ease-out
                  ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
              >
                <h1 className="text-4xl mb-3">{projectInfo.title}</h1>

                <div className="flex gap-5">

                    {/* Carrusel de imágenes */}
                    {projectInfo.images && projectInfo.images.length > 0 && (
                        <div className="mb-6">
                          <div className="relative w-2xl h-48 md:h-96 md:w-xl overflow-hidden border-2 rounded-xl bg-gray-100 mb-4">
                            <img
                              src={projectInfo.images[currentImageIndex]}
                              alt={`${projectInfo.title} - Imagen ${currentImageIndex + 1}`}
                              className="w-full h-full object-cover transition-opacity duration-500"
                            />

                            {projectInfo.images.length > 1 && (
                              <>
                                <button
                                  onClick={prevImage}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/70 transition-colors cursor-pointer"
                                >
                                  ‹
                                </button>
                                <button
                                  onClick={nextImage}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/70 transition-colors cursor-pointer"
                                >
                                  ›
                                </button>
                              </>
                            )}
                          </div>
                          
                          {projectInfo.images.length > 1 && (
                            <div className="bottom-4 left-0 right-0 flex justify-center space-x-2">
                              {projectInfo.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => goToSlide(index)}
                                  className={`w-3 h-3 rounded-full cursor-pointer ${
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

                    <div>
                        <p className="text-neutral-300 whitespace-pre-line max-w-md mb-4">{projectInfo.description}</p>
                        <CardsSectionModal buttons={projectInfo.buttons} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center content-center max-w-xl gap-4">
                  {projectInfo.tag.map((tag, index) => (
                    <span 
                    key = {index}
                    className="flex items-center justify-center text-neutral-300 bg-zinc-700 gap-2 px-2 py-1 rounded-full cursor-default">
                      {techIcons[tag] && <span>{techIcons[tag]}</span>}
                      <span>{tag}</span>
                    </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CircleTransitionModal