import { useEffect, useRef, useState, useMemo, useCallback } from "react";

export default function EnhancedBlackHole({ coreImageWEBP, ringImageWEBP }) {
  const filterRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  const ROTATION_SPEED = 0.00005;
  const phaseRef = useRef(0);

  const config = useMemo(() => {
    const configs = {
      mobile: {
        size: 'min(36vw, 240px)',
        aspectRatio: 'min(37.8vw, 252px)',
        distortionScale: 0.8,
        filterSize: '180%',
        blurAmount: '3',
        softBlur: '0.5'
      },
      tablet: {
        size: 'min(36vw, 240px)',
        aspectRatio: 'min(37.8vw, 252px)',
        distortionScale: 0.8,
        filterSize: '180%',
        blurAmount: '3',
        softBlur: '0.5'
      },
      desktop: {
        size: 'min(43.2vw, 432px)',
        aspectRatio: 'min(45.36vw, 454px)',
        distortionScale: 1,
        filterSize: '200%',
        blurAmount: '3',
        softBlur: '0.5'
      }
    };
    return configs[screenSize];
  }, [screenSize]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newSize = 'desktop';
      
      if (width < 640) newSize = 'mobile';
      else if (width < 1024) newSize = 'tablet';
      
      setScreenSize(newSize);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.documentElement);
    
    handleResize(); 

    return () => resizeObserver.disconnect();
  }, []);

  const animate = useCallback((timestamp) => {
    if (!filterRef.current || !isLoaded) return;

    const elements = {
      turbulence: filterRef.current.querySelector("feTurbulence"),
      displacementMap: filterRef.current.querySelector("feDisplacementMap"),
      turbulence2: filterRef.current.querySelector("#turbulence2"),
      displacementMap2: filterRef.current.querySelector("#displacementMap2"),
      turbulence3: filterRef.current.querySelector("#turbulence3"),
      displacementMap3: filterRef.current.querySelector("#displacementMap3")
    };

    if (!elements.turbulence || !elements.displacementMap) return;

    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    phaseRef.current = (phaseRef.current + ROTATION_SPEED * deltaTime) % 1;

    const sinValue = Math.sin(phaseRef.current * Math.PI * 2);
    const cosValue = Math.cos(phaseRef.current * Math.PI * 2);
    const scaleMultiplier = config.distortionScale;

    const updateTurbulence = (element, baseX, baseY, seedOffset = 0) => {
      if (!element) return;
      element.setAttribute("baseFrequency", `${baseX} ${baseY}`);
      element.setAttribute("seed", ((phaseRef.current * 100 + seedOffset) % 100).toString());
    };

    const updateDisplacement = (element, scale) => {
      if (!element) return;
      element.setAttribute("scale", (scale * scaleMultiplier).toString());
    };

    updateTurbulence(
      elements.turbulence,
      0.02 + Math.abs(sinValue) * 0.01,
      0.016 + Math.abs(cosValue) * 0.008
    );
    updateDisplacement(elements.displacementMap, 15 + Math.abs(sinValue) * 10);

    updateTurbulence(
      elements.turbulence2,
      0.05 + Math.abs(cosValue) * 0.02,
      0.04 + Math.abs(sinValue) * 0.015,
      50
    );
    updateDisplacement(elements.displacementMap2, 8 + Math.abs(cosValue) * 5);

    updateTurbulence(
      elements.turbulence3,
      0.03 + Math.abs(sinValue * cosValue) * 0.01,
      0.025 + Math.abs(sinValue + cosValue) * 0.01,
      25
    );
    updateDisplacement(elements.displacementMap3, 12 + Math.abs(sinValue * cosValue) * 8);

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isLoaded, config.distortionScale]);

  useEffect(() => {
    let currentRaf = null;

    const startAnimation = () => {
        if (!currentRaf) {
            currentRaf = requestAnimationFrame(animate);
        }
    };

    const stopAnimation = () => {
        if (currentRaf) {
            cancelAnimationFrame(currentRaf);
            currentRaf = null;
            lastTimeRef.current = 0;
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            stopAnimation();
        } else if (isLoaded) {
            startAnimation();
        }
    };

    if (isLoaded) {
      if (!document.hidden) {
        startAnimation();
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
        stopAnimation();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [animate, isLoaded]);

  const svgFilters = useMemo(() => (
    <svg ref={filterRef} className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="distortion" x="-50%" y="-50%" width={config.filterSize} height={config.filterSize}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.016" numOctaves="3" seed="0" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="distortion2" x="-50%" y="-50%" width={config.filterSize} height={config.filterSize}>
          <feTurbulence id="turbulence2" type="turbulence" baseFrequency="0.05 0.04" numOctaves="2" seed="50" result="noise2" />
          <feDisplacementMap id="displacementMap2" in="SourceGraphic" in2="noise2" scale="8" xChannelSelector="G" yChannelSelector="B" />
        </filter>

        <filter id="distortion3" x="-50%" y="-50%" width={config.filterSize} height={config.filterSize}>
          <feTurbulence id="turbulence3" type="fractalNoise" baseFrequency="0.03 0.025" numOctaves="1" seed="25" result="noise3" />
          <feDisplacementMap id="displacementMap3" in="SourceGraphic" in2="noise3" scale="12" xChannelSelector="B" yChannelSelector="R" />
        </filter>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={config.blurAmount} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softBlur">
          <feGaussianBlur stdDeviation={config.softBlur} />
        </filter>
      </defs>
    </svg>
  ), [config.filterSize, config.blurAmount, config.softBlur]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      {svgFilters}

      <div 
        className="relative"
        style={{
          width: config.size,
          height: config.aspectRatio
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{
            filter: "url(#distortion)",
            willChange: "filter",
            transform: "translateZ(0)",
          }}
        >
          <picture>
            <source srcSet={ringImageWEBP} type="image/webp" />
            <img
              alt="Aro del agujero negro"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
              onLoad={handleImageLoad}
              style={{ opacity: 0.9 }}
            />
          </picture>
        </div>

        <div
          className="absolute inset-0 z-12"
          style={{
            filter: "url(#distortion3)",
            willChange: "filter",
            transform: "translateZ(0)",
            mixBlendMode: "lighten",
          }}
        >
          <picture>
            <source srcSet={ringImageWEBP} type="image/webp" />
            <img
              alt="Aro del agujero negro - capa 3"
              className="w-full h-full object-contain"
              loading="eager"
              decoding="async"
              style={{ opacity: 0.6 }}
            />
          </picture>
        </div>

        <div className="absolute inset-0 z-20">
          <picture>
            <source srcSet={coreImageWEBP} type="image/webp" />
            <img
              alt="Núcleo del agujero negro"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}