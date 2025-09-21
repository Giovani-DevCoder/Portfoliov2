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
    <section className='section-home'>
        <ShootingStars side="both" frequency={1} />
      
        {/* Mobile Layout */}
        <div className="block lg:hidden w-full h-full">

            {/* Background Elements - Mobile */}
            <div className='inset-0 mt-18 flex items-center justify-center'>

                <div className="relative w-full h-60 ">

                    <BlackHoleAnimation 
                      coreImageWEBP={blackHole01WEBP}
                      ringImageWEBP={blackHole02WEBP}
                    />
                    <FloatingTechIcons />

                </div>

            </div>

            {/* Content - Mobile */}
            <div className='relative z-30 h-full flex flex-col p-4'>

              {/* Top Content */}
              <div className="text-center mx-18 mb-8">

                  <ModeSelector />

                  <h1 className="home-tittle font-extralight tracking-wider gradient-color leading-tight mt-2 mb-2">
                    GIOVANNI LINARES
                  </h1>
    
                  <h2 className="home-subtittle text-indigo-500 tracking-widest break-words whitespace-normal">
                    Full-Stack MERN Developer & Godot Enthusiast
                  </h2>

              </div>
  
              {/* Bottom Content */}
              <div className="space-y-4 flex items-center justify-center flex-col">
                <div className='w-full px-4 sm:px-40 md:px-52'>
                  <ThreeCardsSection />
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-300 font-light tracking-wide leading-relaxed px-2">
                    Desarrollador Fullstack con experiencia en aplicaciones web modernas y eficientes.
                  </p>
                </div>
              </div>
            </div>
        </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full h-full">
        {/* Background Elements - Desktop */}
      
        {/* Main Content - Desktop */}
        
        <div className='z-30 flex-1 flex flex-col justify-center px-8 max-w-3xl'>

          <div className='flex gap-4'>
              <h1 className="mb-5 gradient-color">GIOVANNI LINARES</h1>

              <ModeSelector />
          </div>

            <h2 className="mb-8 gradient-color">Full-Stack MERN Developer <br></br>& Godot Enthusiast</h2>

            <div className='w-full mb-8'>
              <ThreeCardsSection />
            </div>

          <div className="max-w-2xl">
              <p className="text-base lg:text-lg text-zinc-300 font-light tracking-wide leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
          </div>
        </div>
        
        <div className='section-content relative flex-1 '>      
            <BlackHoleAnimation 
              coreImageWEBP={blackHole01WEBP}
              ringImageWEBP={blackHole02WEBP}
            />
            <FloatingTechIcons />
        </div>
      </div>

    </section>
  );
};

export default Home;