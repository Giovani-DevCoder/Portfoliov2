import React from 'react';
import blackHole01WEBP from '../../assets/blackHole01.webp';
import blackHole02WEBP from '../../assets/blackHole02.webp';
import blackHole01PNG from '../../assets/blackHole01.png';
import blackHole02PNG from '../../assets/blackHole02.png';
import ThreeCardsSection from "../cards/ThreeCardsSection";
import BlackHoleAnimation from "../BlackHole";
import ShootingStars from '../Shooting-stars';
import FloatingTechIcons from "../FloatingTechIcons"


const Home = () => {
  return (
    <section>
      <ShootingStars side="both" frequency={10} />

      <div className='relative'>
        <div className="absolute bg-neutral-400 left-40 w-48 h-9 z-50 rounded-lg">
          <button 
            onClick={() => document.body.classList.remove('light-mode')}
            style={{ background: '#222', color: '#fff', marginRight: '10px', border: 'none', padding: '8px 16px', borderRadius: '4px' }}
          >
            Oscuro
          </button>
          <button 
            onClick={() => document.body.classList.add('light-mode')}
            style={{ background: '#fff', color: '#222', border: '1px solid #ccc', borderRadius: '4px' }}
          >
            Blanco
          </button>
        </div>
          <BlackHoleAnimation 
            coreImageWEBP={blackHole01WEBP}
            coreImagePNG={blackHole01PNG}
            ringImageWEBP={blackHole02WEBP}
            ringImagePNG={blackHole02PNG}
          />
          <FloatingTechIcons />
          </div>

      <div className='z-30 m-4'>
        
          <div className="cursor-default">
            <h1 className="text-8xl font-extralight tracking-wider gradient-color">DESARROLLADOR FULLSTACK</h1>
            <h2 className="text-4xl text-zinc-300 tracking-widest">GIOVANNI LINARES PADRON</h2>
          </div>
          
          <div className='w-2xl'>
            <ThreeCardsSection />
          </div>
          <p className="w-2xl overflow-hidden text-ellipsis text-lg text-zinc-300 font-light tracking-wide">
              Soy un apasionado desarrollador Fullstack con experiencia en la creación de aplicaciones web modernas y eficientes. Me encanta aprender nuevas tecnologías y enfrentar desafíos complejos para crear soluciones innovadoras.
          </p>
      </div>
      
    </section>
  );
};

export default Home;
