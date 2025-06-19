import CardWithDots from "./CardWithDots"

const ThreeCardsSection = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardWithDots title="LinkedIn" description="Conecta profesionalmente" type="linkedin" href="https://www.linkedin.com/in/giovani-linares/"/>

        <CardWithDots title="Send Email" description="Contacto directo" type="email" />

        <CardWithDots title="Download CV" description="Curriculum in PDF" type="CV" />

        <CardWithDots title="Github" description="Explora mis proyectos" type="github" href="https://github.com/Giovani-DevCoder" />
      </div>
    </div>
  )
}


export default ThreeCardsSection
