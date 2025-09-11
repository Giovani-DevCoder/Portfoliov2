import { useState, useEffect } from "react"

const CircleTransitionModal = ({ open, onClose, children }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (open) {
      // Esperar a que el círculo termine de expandirse (700ms) antes de mostrar contenido
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      // Ocultar contenido inmediatamente cuando se cierra
      setShowContent(false)
    }
  }, [open])

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
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CircleTransitionModal