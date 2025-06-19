import { useEffect, useState } from "react"

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const  navItems = [
    { id: "home", label: "Inicio" },
    { id: "projects", label: "Proyectos" },
    { id: "about", label: "Sobre Mí" },
    { id: "skills", component: "Skills" },
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="nav-link" aria-label={item.label}>
          <div className={`nav-dot ${activeSection === item.id ? "active" : ""}`} title={item.label} />
        </a>
      ))}
    </nav>
  )
}

export default Navigation
