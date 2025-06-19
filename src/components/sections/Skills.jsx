import React from 'react';
import moonPNG from '../../assets/moon.png'

const Skills = () => {
  return (
    <section className="relative">
      <div className="section-content">
        <h1 className="text-9xl font-bold mb-6">SKILLS</h1>
      </div>

      <img className="absolute w-full h-auto image-gradient" src={moonPNG} alt="Moon" />
    </section>
  );
};

export default Skills;