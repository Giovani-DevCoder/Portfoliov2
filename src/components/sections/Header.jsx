import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const Header = ({ currentSection, navigateToSection, sections }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-9 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-black bg-opacity-70 backdrop-blur-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-20 flex justify-between items-center">
        {/* Logo */}
        <h4 className="text-xl font-bold text-neutral-200 tracking-wider">MiSitio</h4>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex gap-3 sm:gap-5 md:gap-8">
          {sections.map((section, idx) => (
            <button
              key={section.id}
              onClick={() => {
                navigateToSection(idx)
                setIsMenuOpen(false)
              }}
              className={`
                relative overflow-hidden
                text-zinc-300 cursor-pointer hover:text-white 
                transition text-sm sm:text-base uppercase tracking-wide
                ${currentSection === idx ? "font-bold text-white" : ""}
                after:content-[''] after:absolute after:bottom-0 after:left-0 
                after:w-0 after:h-px after:bg-white after:transition-all after:duration-300
                hover:after:w-full
              `}
            >
              {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
            </button>
          ))}
        </nav>

        {/* Botón de menú móvil */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-20 bg-black bg-opacity-70 backdrop-blur-lg">
          <nav className="flex flex-col items-center space-y-8 pt-8">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => {
                  navigateToSection(idx)
                  setIsMenuOpen(false)
                }}
                className={`
                  text-xl tracking-wider relative overflow-hidden
                  ${currentSection === idx ? "font-bold text-white" : "text-zinc-300 hover:text-white"}
                  after:content-[''] after:absolute after:bottom-0 after:left-0 
                  after:w-0 after:h-px after:bg-white after:transition-all after:duration-300
                  hover:after:w-full
                `}
              >
                {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header