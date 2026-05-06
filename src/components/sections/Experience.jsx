import { useEffect, useRef, useState } from "react"
import { FaLinkedin } from "react-icons/fa";



const Experience = ({onOpenModal}) => {

  

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-background px-6 py-12 md:px-12">
  <div className="w-full max-w-5xl xl:max-w-4xl">
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
      
      <div className="lg:col-span-6 flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            Experiencia Profesional
          </h1>
          <p className="text-lg text-muted-foreground">
            Un año construyendo soluciones impactantes
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Desarrollador de automatización y SEO
            </h2>
            <h3 className="text-primary font-semibold">Contratista independiente</h3>
            <p className="text-sm text-muted-foreground">• Jul 2024 - Nov 2025</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground uppercase text-xs tracking-widest">
              Responsabilidades Clave
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground cursor-default">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="barlow-semi-condensed-extralight text-lg transition-all text-zinc-200 hover:text-zinc-300">Desarrollo y mantenimiento de aplicaciones web usando React y Node.js</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="barlow-semi-condensed-extralight text-lg transition-all text-zinc-200 hover:text-zinc-300">Colaboración con equipos multidisciplinarios para entregar soluciones de calidad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="barlow-semi-condensed-extralight text-lg transition-all text-zinc-200 hover:text-zinc-300">Implementación de mejores prácticas de código y optimización de rendimiento</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Tecnologías Utilizadas:</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'JavaScript', 'Git'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-primary/10 bg-zinc-300 text-zinc-800 text-primary text-xs cursor-default rounded-full border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 flex flex-col gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onOpenModal("Transcriptor")}
            className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col text-left"
          >
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src="/transcriptor.webp"
                alt="Transcriptor"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-foreground">Transcriptor</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Python - Api - C++</p>
            </div>
          </button>

          <button
            onClick={() => onOpenModal("Scraper")}
            className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col text-left"
          >
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src="/scraper.webp"
                alt="Scraper"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4 space-y-1">
              <h4 className="font-bold text-foreground">Scraper</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">N8N - Agente de IA</p>
            </div>
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm max-w-full overflow-hidden">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            Referencia Laboral
          </h4>
                    
          <div className="space-y-1.5">
            {/* Fila 1: Nombre y Email alineados */}
            <div className="flex justify-between items-baseline gap-4">
              <p className="font-bold text-foreground text-sm whitespace-nowrap">
                Yvonne Angelica Blanco Milano
              </p>
              <p className="text-[11px] sm:text-xs text-muted-foreground italic truncate">
                yvangelica@gmail.com
              </p>
            </div>
                    
            <div className="flex justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                Supervisora
              </p>
                    
              <a 
                href="https://www.linkedin.com/in/yvonne-angelica-blanco-milano-42499498/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-zinc-400 no-underline"
              >
               <div className="group-hover:text-zinc-400 flex items-center justify-between gap-1">
                <FaLinkedin className="text-sm transition-colors duration-200" />
                <span className="">LinkedIn</span>
              </div>
              </a>
            </div>
          </div>
        </div>
        <button className="bg-card border border-border rounded-2xl h-20 p-6 shadow-sm cursor-pointer">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            Conocer mas
          </h4>
        </button>

      </div>

    </div>
  </div>
</section>
  );
};

export default Experience;