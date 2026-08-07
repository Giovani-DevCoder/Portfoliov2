import React from 'react';
import './Astronaut.css';

const AstronautaMontado = () => {
  return (
    <div className="astronaut-container relative z-40 w-full max-w-[600px] aspect-[16/9]">
        <img src="/cuerpo_pierna.webp" alt="cuerpo" className="absolut inset-0 w-full h-full object-contain" />

      <div className="brazo-wrapper absolute -z-10 inset-0 w-full h-full">
         <img src="/brazo_avion.webp" alt="brazo" className="w-full h-full object-contain" />
      </div>

      <div className="pierna-wrapper absolute inset-0 w-full h-full">
         <img src="/pierna_bota.webp" alt="pierna" className="w-full h-full object-contain" />
      </div>
    </div>
  );
};

export default AstronautaMontado;