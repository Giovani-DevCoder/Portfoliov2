
const ModeSelector = () => {
    return (
        <div
        className="lg:absolute sm:left-42 lg:left-168 z-50 sm:w-32 lg:w-18 h-6 sm:h-8 lg:h-9 rounded-md lg:rounded-lg flex items-center justify-center gap-1 sm:gap-2 px-1 sm:px-2"
        >
          <button
            onClick={() => document.body.classList.remove('light-mode')}
            className="bg-neutral-800 border border-neutral-300 rounded-full cursor-pointer transition-transform hover:scale-110"
            style={{
              width: '18px',
              height: '18px',
            }}
            aria-label="Modo oscuro"
          />
          <button
            onClick={() => document.body.classList.add('light-mode')}
            className="bg-white border border-neutral-800 rounded-full cursor-pointer transition-transform hover:scale-110"
            style={{
              width: '18px',
              height: '18px',
            }}
            aria-label="Modo claro"
          />
        </div>
    )
}

export default ModeSelector;