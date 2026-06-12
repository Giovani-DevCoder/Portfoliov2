import { useEffect, useRef, useState } from "react"
import { FaLinkedin } from "react-icons/fa";
import { ExperienceCard } from "./ui/experienceCard"

const experiences = [
  {
    id: "2",
    title: "Automation Engineer",
    duration: "Septiembre - Diciembre de 2025",
    description:
      "Diseñé flujos de trabajo n8n, integré agentes de Inteligencia Artificial para resolver las necesidades a peticion de mi empleador y desarrollé soluciones de software backend para la extracción y manejo eficiente de scripts.",
    technologies: ["N8N", "Automatizacion", "Agentes de IA", "Scripts"],
  },
  {
    id: "1",
    title: "Product Support & Developer",
    duration: "2023 - 2026",
    description:
      "Me encargué de la gestión técnica y optimización SEO del blog de la plataforma, mientras creaba soluciones de código y automatizaciones a medida para eliminar tareas repetitivas de la empresa.",
    technologies: ["Python", "JavaScript", "SEO", "Web"],
  },
]


const Experience = ({ onOpenModal }) => {
  const [openCardId, setOpenCardId] = useState(null)

  const handleToggleCard = (id) => {
    setOpenCardId(openCardId === id ? null : id)
  }

  return (
    <section className="min-h-screen w-full flex items-start justify-center bg-background px-6 py-12 md:px-12">
      <div className="w-full max-w-5xl xl:max-w-4xl">
        <div className="relative lg:flex">
          {/* Sección izquierda - Título y texto */}
          <div className="lg:w-[58%] lg:pr-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="lg:w-[30%] shrink-0">
                <h1 className="text-2xl font-bold text-foreground tracking-tight uppercase">
                  EXPERIENCIA PROFESIONAL
                </h1>
              </div>
              <div className="lg:w-[70%]">
                <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                  Todo esto es un texto de ejemplo para tener una referencia de
                  cómo se verá la información una vez la empiece a trabajar y
                  mostrar contenido de manera profesional y limpia a la persona
                  que mire mi sección de experiencia.
                </p>
              </div>
            </div>
          </div>

          {/* Sección derecha - Lista de tarjetas */}
          <div className="lg:w-[42%] lg:absolute lg:right-0 lg:top-0 mt-12 lg:mt-0">
            <div className="flex flex-col gap-3">
              {experiences.map((exp) => (
                <ExperienceCard 
                  key={exp.id} 
                  experience={exp} 
                  isOpen={openCardId === exp.id}
                  onToggle={() => handleToggleCard(exp.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
);
};

export default Experience;