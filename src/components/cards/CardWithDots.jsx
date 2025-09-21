import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Check, Newspaper, Box } from 'lucide-react'

const CardWithDots = ({ title, description, type, href }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const email = "tu-email@ejemplo.com"

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    if (type === "email") {
      navigator.clipboard.writeText(email)
      setIsCopied(true)
    } else if (href) {
      window.open(href, '_blank')
    }
  }

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopied])

  const renderIcon = () => {
    const iconSize = "w-4 h-4 lg:w-6 lg:h-6"
    switch (type) {
      case "github":
        return <Github className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
      case "githubProject":
        return <Github className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
      case "linkedin":
        return <Linkedin className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
      case "CV":
        return <Newspaper className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
      case "email":
        return isCopied ? <Check className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} /> : <Mail className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
      case "Ir":
        return <Box className={`${iconSize} ${isLightMode ? "text-neutral-700" : "text-white"}`} />
        default:
        return null
    }
  }

  const renderText = () => {
    switch (type) {
      case "github":
        return "Github"
      case "githubProject":
        return "Ver codigo"
      case "linkedin":
        return "LinkedIn"
      case "email":
        return isCopied ? "Copiado" : "Email"
      case "CV":
        return "CV"
      case "Ir":
        return "Ver sitio web"
      default:
        return title
    }
  }

  const [isLightMode, setIsLightMode] = useState(document.body.classList.contains("light-mode"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.body.classList.contains("light-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          className={`relative z-10 rounded-lg lg:rounded-2xl
            ${isLightMode ? "bg-white bg-opacity-80 border-neutral-300" : "bg-neutral-800 bg-opacity-70"}
            backdrop-blur-sm grid justify-items-center items-center h-12 lg:h-20 cursor-pointer overflow-hidden 
            transition-all duration-300 px-2 lg:px-4`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {/* Animación de fondo */}
          <div
            className={`absolute rounded-full 
              ${isLightMode ? "bg-neutral-200" : "bg-neutral-600"}
              transition-all duration-700 delay-100 ease-in-out ${
                isHovered ? "scale-[30] opacity-100" : "scale-0 opacity-0"
              }`}
            style={{ width: "10px", height: "10px" }}
          />

          {/* Contenido normal */}
          <div className={`transition-opacity duration-300 text-center ${isHovered ? "opacity-0" : "opacity-100"} ${isLightMode ? "text-neutral-800" : ""}`}>
            <h3 className="text-xs lg:text-base font-medium">{title}</h3>
          </div>
          
          {/* Contenido hover */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-1 lg:gap-2 transition-all duration-500 ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } ${isLightMode ? "text-neutral-800" : ""}`}
          >
            {renderIcon()}
            <p className="text-xs lg:text-base font-medium text-center px-2">{renderText()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardWithDots