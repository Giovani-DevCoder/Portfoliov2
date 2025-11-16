import React from 'react';
import { FaLinkedin } from "react-icons/fa";

const Experience = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center px-8 md:px-12 lg:px-20 py-24 bg-background">
      <div className="max-w-6xl w-full h-full flex items-center py-8">
        <div className="grid md:grid-cols-6 gap-8 w-full h-full max-h-[70vh]">
          {/* Columna izquierda: Información del puesto */}
          <div className="md:col-span-3 flex flex-col">
            <div className="mb-6">
              <h1 className="experiencia font-bold text-foreground mb-2">Experiencia Profesional</h1>
              <p className="text-lg text-muted-foreground">Un año construyendo soluciones impactantes</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-1">Desarrollador de automatizacion y SEO</h3>
                <p className="text-primary font-semibold mb-1">Nombre de la Empresa</p>
                <p className="text-sm text-muted-foreground">Ene 2024 - Presente • 1 año</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Responsabilidades Clave:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Desarrollo y mantenimiento de aplicaciones web usando React y Node.js</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Colaboración con equipos multidisciplinarios para entregar soluciones de calidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Implementación de mejores prácticas de código y optimización de rendimiento</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Tecnologías Utilizadas:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Git</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Proyectos destacados y referencia */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Proyecto 1 */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col">
                <div className="flex-1 bg-muted relative overflow-hidden">
                  <img
                    src="/transcriptor.webp"
                    alt="Proyecto 1"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-foreground">Transcriptor de entrevistas</h4>
                  <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                    <span>Python - Api - C++</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Completado</span>
                  </div>
                </div>
              </div>

              {/* Proyecto 2 */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col">
                <div className="flex-1 bg-muted relative overflow-hidden">
                  <img src="/scraper.webp"
                  alt="Proyecto 2"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-bold text-foreground">Scraper</h4>
                  <div className="flex items-center justify-between gap-1 text-xs text-muted-foreground">
                    <span>N8N - Agente de IA</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">Completado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                Referencia Laboral
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">Yvonne Angelica Blanco Milano</p>
                  <p className="text-sm text-muted-foreground">Supervisora</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">yvangelica@gmail.com</p>
                  <a 
                    href="https://www.linkedin.com/in/yvonne-angelica-blanco-milano-42499498/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-row items-center gap-1 cursor-pointer"
                  >
                    <FaLinkedin className="text-muted-foreground group-hover:text-zinc-600 transition-colors duration-200" />
                    <p className="text-sm text-muted-foreground group-hover:text-zinc-600 transition-colors duration-200">
                      Linkedin
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;