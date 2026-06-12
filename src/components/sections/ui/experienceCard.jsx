import { useState } from "react"
import { ChevronDown, ExternalLink } from "lucide-react"


const cn = (...classes) => classes.filter(Boolean).join(" ")

export function ExperienceCard({ experience, isOpen, onToggle }) {

return (
  <div className="w-full">
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 text-left",
        "bg-zinc-50/90 border-zinc-200 hover:bg-zinc-300/80 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950",
        isOpen && "bg-zinc-200/90 border-zinc-300"
      )}
    >
      <span className="text-sm font-medium text-zinc-800">
        {experience.title}
      </span>
      <ChevronDown
        className={cn(
          "h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>

    {/* Contenido del Acordeón */}
    <div
      className={cn(
        "grid transition-all duration-200 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className="px-4 py-4 rounded-lg cursor-default bg-zinc-200/90 border border-zinc-200/90 transition-all duration-200">
          <div className="space-y-3">
            
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-zinc-800">{experience.duration}</span>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {experience.technologies?.map((tech) => (
                <span 
                  key={tech} 
                  className="inline-flex items-center rounded-full bg-neutral-500 px-2.5 py-0.5 text-xs font-medium text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}