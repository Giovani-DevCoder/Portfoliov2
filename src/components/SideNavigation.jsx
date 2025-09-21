const SideNavigation = ({ currentSection, totalSections, onNavigate }) => {
  return (
    <div className="side-navigation">
      {Array.from({ length: totalSections }).map((_, index) => (
        <div
          key={index}
          className={`nav-indicator ${currentSection === index ? "active" : "" }`}
          onClick={() => onNavigate(index)}
          title={`Sección ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default SideNavigation