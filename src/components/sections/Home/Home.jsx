import React from 'react';
import blackHole01WEBP from '../../../assets/blackHole01.webp';
import blackHole02WEBP from '../../../assets/blackHole02.webp';
import ThreeCardsSection from "../../cards/ThreeCardsSection";
import BlackHoleAnimation from "../../BlackHole";
import ShootingStars from '../../Shooting-stars';
import FloatingTechIcons from "../../FloatingTechIcons"
import ModeSelector from "./modeSelector";

const Home = () => {
    return (
        // CAMBIOS CLAVE AQUÍ:
        // 1. min-h-screen (actúa como 100vh en Tailwind)
        // 2. justify-start: Alinea el contenido al inicio (arriba) en lugar de centrarlo.
        // 3. gap-y-4: Agrega espacio vertical entre los bloques principales.
        <section className='section-home min-h-screen flex flex-col items-center justify-start gap-y-4 p-4 sm:p-6 lg:p-8'>
            <ShootingStars side="both" frequency={1} />
            
            {/* Contenedor Principal Lógico (sirve como límite de ancho) */}
            <div className='w-full max-w-5xl flex flex-col items-center justify-start h-full'> {/* Usamos h-full aquí para que Flexbox funcione correctamente dentro del min-h-screen */}
            
                {/* Mobile Layout (Pantallas < 1024px) */}
                <div className="block lg:hidden w-full h-full flex flex-col items-center justify-start"> {/* h-full y justify-start para controlar el espacio */}

                    {/* 1. Área de Animación (Se mantiene arriba) */}
                    <div className='relative flex items-center justify-center mt-6 w-full'>
                        <div className="relative">
                            <BlackHoleAnimation 
                                coreImageWEBP={blackHole01WEBP}
                                ringImageWEBP={blackHole02WEBP}
                            />
                            <FloatingTechIcons />
                        </div>
                    </div>

                    {/* 2. Área de Contenido de Texto y Tarjetas */}
                    <div className='relative z-30 flex flex-col items-center text-center mt-6'> {/* Margen superior para separación vertical */}

                        {/* Top Content (Títulos) */}
                        <div className="mb-6 w-full">
                            <ModeSelector />
                            <h1 className="home-tittle font-extralight tracking-wider gradient-color leading-tight mt-2 mb-2">
                                GIOVANNI LINARES
                            </h1>
                            <h2 className="home-subtittle text-indigo-500 tracking-widest break-words whitespace-normal">
                                Full-Stack MERN Developer & Godot Enthusiast
                            </h2>
                        </div>
        
                        {/* Bottom Content (Cards y Párrafo) */}
                        <div className="space-y-4 flex items-center justify-center flex-col w-full">
                            <div className='w-full px-4 sm:px-40 md:px-52'>
                                <ThreeCardsSection />
                            </div>
                            <div className="text-center max-w-xl">
                                <p className="text-xs text-zinc-300 font-light tracking-wide leading-relaxed px-2">
                                    Desarrollador Fullstack con experiencia en aplicaciones web modernas y eficientes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (Pantallas >= 1024px) */}
                <div className="hidden lg:flex flex-col items-center w-full h-full justify-start"> {/* h-full y justify-start */}

                    <div className='absolute flex items-center justify-center w-full'> 
                        <div className="relative">
                            <BlackHoleAnimation 
                                coreImageWEBP={blackHole01WEBP}
                                ringImageWEBP={blackHole02WEBP}
                            />
                            <FloatingTechIcons />
                        </div>
                    </div>

                    <div className='relative z-30 flex flex-col p-4 w-full items-center text-center mt-80'>
                        <ModeSelector />
                        <div className="mb-5">
                            
                              <h1 className="home-tittle font-extralight tracking-wider gradient-color leading-tight">
                                  GIOVANNI LINARES
                              </h1>
                              <h2 className="home-subtittle">
                                Desarrollador backend.
                              </h2>
                            
                        </div>

                        {/* Bottom Content (Cards y Párrafo) */}
                        <div className="space-y-6 flex items-center justify-center flex-col w-full">
                            <div className='w-full max-w-2xl'> 
                                <ThreeCardsSection />
                            </div>
                          
                            <div className="text-center max-w-3xl"> 
                                <p className="text-base lg:text-lg text-zinc-300 font-light tracking-wide leading-relaxed px-2">
                                    Desarrollador Fullstack con experiencia en aplicaciones web modernas y eficientes. 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Home;