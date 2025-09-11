import { useEffect, useState } from "react"
import Home from "./components/sections/Home"
import About from "./components/sections/About"
import Project from "./components/sections/Project"
import Skills from "./components/sections/Skills";  // Nueva línea
import SideNavigation from "./components/SideNavigation"
import NavigationButtons from "./components/NavigationButtons"
import "./App.css"
import Header from "./components/sections/Header";
import CircleTransitionModal from "./components/modal/CircleTransitionModal"

function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const totalSections = 4
  const transitionDuration = 1000 // duración en ms, debe coincidir con la duración de la transición CSS
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState("")

const handleOpenModal = (content) => {
  setModalContent(content)
  setModalOpen(true)
}
const handleCloseModal = () => {
  setModalOpen(false)
  setTimeout(() => setModalContent(""), 700)
}


  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) {
        e.preventDefault()
        return
      }

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        navigateToSection(currentSection + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        navigateToSection(currentSection - 1)
      }
      e.preventDefault()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchmove", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchmove", handleWheel)
    }
  }, [currentSection, isTransitioning])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return

      if (e.key === "ArrowDown" && currentSection < totalSections - 1) {
        navigateToSection(currentSection + 1)
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        navigateToSection(currentSection - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, isTransitioning])

  const navigateToSection = (index) => {
    if (index >= 0 && index < totalSections && !isTransitioning) {
      setIsTransitioning(true)
      setCurrentSection(index)
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, transitionDuration)
    }
  }

  const sections = [
    { id: "home", component: <Home /> },
    { id: "projects", component: <Project onOpenModal={handleOpenModal} /> },
    { id: "about", component: <About /> },
    { id: "skills", component: <Skills /> },
  ]

  return (
    <div className="app-container">
      {sections[currentSection].id === "projects" && (
      <CircleTransitionModal open={modalOpen} onClose={handleCloseModal}>
        <h2>{modalContent}</h2>
        {/* ... */}
      </CircleTransitionModal>
      )}

      <Header
        currentSection={currentSection}
        navigateToSection={navigateToSection}
        sections={sections}
      />
      <SideNavigation 
        currentSection={currentSection} 
        totalSections={totalSections} 
        onNavigate={navigateToSection} 
      />
      <div className="sections-container">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`section-wrapper ${index === currentSection ? "active" : ""} ${
              index < currentSection ? "above" : index > currentSection ? "below" : ""
            }`}
          >
            {section.component}
          </div>
        ))}
      </div>

      <NavigationButtons 
        currentSection={currentSection} 
        totalSections={totalSections} 
        onNavigate={navigateToSection} 
      />
    </div>
  )
}

export default App