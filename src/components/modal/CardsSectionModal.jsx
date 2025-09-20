import CardWithDots from "../cards/CardWithDots";

const CardsSectionModal = () => {
return (
    <div className="w-full">
      {/* Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
        <CardWithDots title="Visitar sitio" description="Conecta profesionalmente" type="Ir" href="https://www.linkedin.com/in/giovani-linares/"/>
        <CardWithDots title="Ver codigo de Github" description="Explora mis proyectos" type="githubProject" href="https://github.com/Giovani-DevCoder/E-Commerce" />
      </div>

      {/* Desktop: 4 columns */}
      <div className="hidden lg:grid grid-cols-3 gap-4 xl:gap-4">
        <CardWithDots title="Visitar sitio" description="Conecta profesionalmente" type="Ir" href="https://www.linkedin.com/in/giovani-linares/"/>
        <CardWithDots title="Ver codigo de Github" description="Explora mis proyectos" type="githubProject" href="https://github.com/Giovani-DevCoder/E-Commerce" />
      </div>
    </div>
  )
}

export default CardsSectionModal