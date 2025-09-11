import CardWithDots from "./CardWithDots"

const ThreeCardsSection = () => {
  return (
    <div className="w-full">
      {/* Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
        <CardWithDots title="LinkedIn" description="Conecta profesionalmente" type="linkedin" href="https://www.linkedin.com/in/giovani-linares/"/>
        <CardWithDots title="Github" description="Explora mis proyectos" type="github" href="https://github.com/Giovani-DevCoder" />
        <CardWithDots title="Email" description="Contacto directo" type="email" />
        <CardWithDots title="CV" description="Curriculum PDF" type="CV" />
      </div>

      {/* Desktop: 4 columns */}
      <div className="hidden lg:grid grid-cols-4 gap-4 xl:gap-6">
        <CardWithDots title="LinkedIn" description="Conecta profesionalmente" type="linkedin" href="https://www.linkedin.com/in/giovani-linares/"/>
        <CardWithDots title="Enviar Email" description="Contacto directo" type="email" />
        <CardWithDots title="Descargar CV" description="Curriculum in PDF" type="CV" />
        <CardWithDots title="Github" description="Explora mis proyectos" type="github" href="https://github.com/Giovani-DevCoder" />
      </div>
    </div>
  )
}

export default ThreeCardsSection