import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Check, Newspaper } from "lucide-react"

const CardWithDots = ({ title, description, type, href }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const email = ""

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleEmailClick = () => {
    if (type === "email") {
      navigator.clipboard.writeText(email)
      setIsCopied(true)
    }
  }
  const handleClick = () => {
    if (type === "email") {
      navigator.clipboard.writeText(email)
      setIsCopied(true)
    } else if (href) {
      window.open(href, '_blank') // Abre en nueva pestaña
      // o usar: window.location.href = href // Para abrir en la misma pestaña
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
    switch (type) {
      case "github":
        return <Github className="w-7 h-7 text-white" />
      case "linkedin":
        return <Linkedin className="w-7 h-7 text-white" />
      case "CV":
        return <Newspaper className="w-7 h-7 text-white" />
      case "email":
        return isCopied ? <Check className="w-7 h-7 text-white" /> : <Mail className="w-7 h-7 text-white" />
      default:
        return null
    }
  }

  const renderText = () => {
    switch (type) {
      case "github":
        return "Ir a mi Github"
      case "linkedin":
        return "Ir a mi LinkedIn"
      case "email":
        return isCopied ? "Correo copiado" : "Send Email"
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
    <div>
    {/* Contenedor con separación visual */}
    <div className="relative pb-7">
      {/* Carta centrada con espacio */}
      <div
        className={`relative z-10 mt-4 rounded-2xl 
          ${isLightMode ? "bg-white bg-opacity-80 border-neutral-300" : "bg-neutral-800 bg-opacity-70 border-neutral-700"}
          backdrop-blur-sm grid justify-items-center items-center h-20 cursor-pointer overflow-hidden 
          group-hover:border-neutral-600 transition-all duration-300`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Animación de fondo (círculos grandes) */}
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
          <h3>{title}</h3>
          {type === "email" && (
            <p>{email}</p>
          )}
        </div>
        
        {/* Contenido hover */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          } ${isLightMode ? "text-neutral-800" : ""}`}
        >
          {renderIcon()}
          <p>{renderText()}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CardWithDots
