import React from 'react';


const About = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-2 grid-rows-2 w-full h-[75vh]">
      
        {/* Bloque 1: Superior Izquierda */}
        <div className="border-r border-b border-white p-8">
          
        </div>

        {/* Bloque 2: Superior Derecha */}
        <div className="border-b border-white pl-5 pb-7 flex flex-col justify-between">
          <h2 className="text-5xl font-extrabold text-zinc-100 mb-4">
            SOBRE MI
          </h2>

          {/* Párrafo */}
          <p className="text-zinc-100 text-lg leading-relaxed">
            Soy un desarrollador apasionado por crear experiencias digitales excepcionales. 
            Con experiencia en desarrollo web y una constante búsqueda de aprendizaje, 
            me especializo en transformar ideas en soluciones tecnológicas innovadoras.<br /> <br />
            Mi enfoque se centra en escribir codigo limpio, escalable y centrado en 
            el usuario. Me encanta trabajar en proyectos desafiantes que me permitan 
            crecer profesionalmente
          </p>
        </div>

        {/* Bloque 3: Inferior Izquierda */}
        <div className="border-r border-white pr-5 py-7 flex flex-col items-end justify-between">
          <h2 className="text-5xl font-extrabold bg-zinc-200 text-zinc-800 p-1 mb-4">
            MI HUELLA
          </h2>

          <p className="text-zinc-100 text-lg leading-relaxed">
            SVG
          </p>
        </div>

        {/* Bloque 4: Inferior Derecha */}
        <div className="p-8 flex items-center justify-center gap-4">
          {/* Caja 1 */}
          <div className="w-2/4 aspect-square bg-zinc-400 flex items-center justify-center">
            <span className="text-white">texto</span>
          </div>
          
          {/* Caja 2 */}
          <div className="w-2/4 aspect-square bg-zinc-400 flex items-center justify-center">
            <span className="text-white">texto</span>
          </div>
          
          {/* Caja 3 */}
          <div className="w-2/4 aspect-square bg-zinc-400 flex items-center justify-center">
            <span className="text-white">texto</span>
          </div>
        </div>

        </div>
      </div>
    </section>
  )
}

export default About