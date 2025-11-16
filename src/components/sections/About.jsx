import React from 'react';


const About = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Columna izquierda: Imagen y "Más sobre mí" */}
          <div className="flex flex-col items-center md:items-start gap-6">
            {/* Imagen de perfil */}
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/professional-developer-portrait.png"
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decoración */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-2xl -z-10"></div>
            </div>

            <div className="w-full max-w-sm space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Más Sobre Mí</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border">
                  <span className="text-xl">💻</span>
                  <span className="text-sm text-foreground">Desarrollo</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border">
                  <span className="text-xl">🎨</span>
                  <span className="text-sm text-foreground">Diseño</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border">
                  <span className="text-xl">📚</span>
                  <span className="text-sm text-foreground">Aprendizaje</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start space-y-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">¡Hola! Soy [Tu Nombre]</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Soy un desarrollador apasionado por crear experiencias digitales excepcionales. Con experiencia en
                desarrollo web y una constante búsqueda de aprendizaje, me especializo en transformar ideas en
                soluciones tecnológicas innovadoras.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mi enfoque se centra en escribir código limpio, escalable y centrado en el usuario. Me encanta trabajar
                en proyectos desafiantes que me permitan crecer profesionalmente.
              </p>
            </div>

            {/* Información rápida */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-semibold text-foreground">Tu Ciudad, País</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Experiencia</p>
                <p className="font-semibold text-foreground">X+ años</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">tu@email.com</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Disponibilidad</p>
                <p className="font-semibold text-primary">Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About