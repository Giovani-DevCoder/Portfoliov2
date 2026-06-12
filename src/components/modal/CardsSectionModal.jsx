import CardWithDots from "../cards/CardWithDots";

const CardsSectionModal = ({ buttons = [] }) => {
  if (!buttons || buttons.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-4">
        {buttons.map((btn, index) => (
          <div key={index} className="w-full sm:w-auto min-w-[200px] max-w-[250px]">
            <CardWithDots 
              title={btn.title} 
              description={btn.description || "Explorar"} 
              type={btn.type} 
              href={btn.href} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardsSectionModal