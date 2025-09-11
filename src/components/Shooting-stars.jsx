import { useEffect, useRef, useState } from "react"

const ShootingStars = ({ side = "both", frequency = 8, speed = 1.2, color = "#ffffff" }) => {
  const canvasRef = useRef(null)
  const [screenSize, setScreenSize] = useState('desktop')

  // Detectar tamaño de pantalla
  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Configuraciones responsivas
  const getResponsiveConfig = () => {
    const configs = {
      mobile: {
        maxStars: 4,
        sideMargin: 0.15,
        maxTravel: 0.12,
        lengthRange: [15, 35],
        speedRange: [12, 18],
        sizeRange: [0.3, 0.7],
        frequency: frequency * 1.5
      },
      tablet: {
        maxStars: 6,
        sideMargin: 0.18,
        maxTravel: 0.14,
        lengthRange: [18, 45],
        speedRange: [15, 22],
        sizeRange: [0.4, 0.8],
        frequency: frequency * 1.2
      },
      desktop: {
        maxStars: 8,
        sideMargin: 0.2,
        maxTravel: 0.15,
        lengthRange: [20, 60],
        speedRange: [15, 25],
        sizeRange: [0.4, 0.9],
        frequency: frequency
      }
    }
    return configs[screenSize]
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const config = getResponsiveConfig()

    class ShootingStar {
      constructor(isLeft) {
        this.isLeft = isLeft
        this.reset()
      }

      reset() {
        const config = getResponsiveConfig()

        if (this.isLeft) {
          this.x = Math.random() * (canvas.width * config.sideMargin * 0.8)
          this.maxX = this.x + canvas.width * config.maxTravel
        } else {
          this.x = canvas.width - Math.random() * (canvas.width * config.sideMargin * 0.8)
          this.maxX = this.x - canvas.width * config.maxTravel
        }

        this.y = Math.random() * (canvas.height * 0.6)

        this.length = Math.floor(Math.random() * (config.lengthRange[1] - config.lengthRange[0])) + config.lengthRange[0]
        this.speed = Math.random() * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0]
        this.size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0]
        this.tail = []
        this.opacity = 1
        this.fadeSpeed = Math.random() * 0.05 + 0.03
        this.active = true
        this.fading = false
      }

      update() {
        if (!this.active) return

        if (this.fading) {
          this.opacity = Math.max(0, this.opacity - this.fadeSpeed * 2)

          if (this.opacity <= 0) {
            this.active = false
            this.tail = []
            return
          }

          this.tail.forEach((point) => {
            point.alpha = point.alpha * 0.9
          })

          return
        }

        if (this.isLeft) {
          this.x += this.speed
          this.y += this.speed * 0.2

          if (this.x >= this.maxX) {
            this.fading = true
          }
        } else {
          this.x -= this.speed
          this.y += this.speed * 0.2

          if (this.x <= this.maxX) {
            this.fading = true
          }
        }

        this.tail.unshift({ x: this.x, y: this.y, alpha: this.opacity })

        if (this.tail.length > this.length) {
          this.tail.pop()
        }

        this.tail.forEach((point, index) => {
          point.alpha = ((this.tail.length - index) / this.tail.length) * this.opacity
        })
      }

      draw(ctx) {
        if (this.tail.length < 2) return

        ctx.strokeStyle = color
        ctx.lineWidth = this.size
        ctx.beginPath()

        for (let i = 0; i < this.tail.length - 1; i++) {
          const point = this.tail[i]
          const nextPoint = this.tail[i + 1]

          if (i === 0) {
            ctx.moveTo(point.x, point.y)
          }

          ctx.globalAlpha = point.alpha * 0.9
          ctx.lineTo(nextPoint.x, nextPoint.y)
        }

        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    const stars = []

    const useLeft = side === "left" || side === "both"
    const useRight = side === "right" || side === "both"

    const addStar = () => {
      const activeStars = stars.filter((star) => star.active && !star.fading).length

      if (activeStars < config.maxStars / 2) {
        const inactiveStar = stars.find((star) => !star.active)

        if (inactiveStar) {
          inactiveStar.reset()
        } else if (stars.length < config.maxStars) {
          if (useLeft && useRight) {
            stars.push(new ShootingStar(Math.random() > 0.5))
          } else if (useLeft) {
            stars.push(new ShootingStar(true))
          } else if (useRight) {
            stars.push(new ShootingStar(false))
          }
        }
      }
    }

    const addStarWithRandomDelay = () => {
      const randomDelay = Math.random() * (config.frequency * 1000) + config.frequency * 500
      setTimeout(() => {
        addStar()
        addStarWithRandomDelay()
      }, randomDelay)
    }

    addStarWithRandomDelay()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.update()
        star.draw(ctx)
      })

      if (Math.random() < 0.01) {
        const activeStarsCount = stars.filter((star) => star.active).length
        if (activeStarsCount < config.maxStars / 4) {
          stars.length = stars.filter((star) => star.active).length
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [side, frequency, speed, color, screenSize])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" style={{ opacity: 0.8 }} />
}

export default ShootingStars