import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const NavigationButtons = ({ currentSection, totalSections, onNavigate }) => {
  return (
    <div className="navigation-buttons">
      {currentSection > 0 && (
        <button 
          className="nav-button up" 
          onClick={() => onNavigate(currentSection - 1)} 
          title="Sección anterior"
          aria-label="Sección anterior"
        >
          <div className="button-animation">
            <FaChevronUp size={20} />
          </div>
        </button>
      )}

      {currentSection < totalSections - 1 && (
        <button 
          className="nav-button down" 
          onClick={() => onNavigate(currentSection + 1)} 
          title="Siguiente sección"
          aria-label="Siguiente sección"
        >
          <div className="button-animation">
            <FaChevronDown size={20} />
          </div>
        </button>
      )}
    </div>
  )
}

export default NavigationButtons