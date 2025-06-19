import { useEffect, useRef } from "react"

const ShootingStars = ({ side = "both", frequency = 8, speed = 1.2, color = "#ffffff" }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clase para las estrellas fugaces
    class ShootingStar {
      constructor(isLeft) {
        this.isLeft = isLeft
        this.reset()
      }

      reset() {
        const sideMargin = 0.2 // 20% del ancho de la pantalla desde los laterales
        const maxTravel = 0.15 // 15% del ancho de la pantalla como máximo recorrido

        // Posición inicial
        if (this.isLeft) {
          // Desde la izquierda
          this.x = Math.random() * (canvas.width * sideMargin * 0.8)
          this.maxX = this.x + canvas.width * maxTravel
        } else {
          // Desde la derecha
          this.x = canvas.width - Math.random() * (canvas.width * sideMargin * 0.8)
          this.maxX = this.x - canvas.width * maxTravel
        }

        // Posición vertical aleatoria en el 60% superior de la pantalla
        this.y = Math.random() * (canvas.height * 0.6)

        // Propiedades
        this.length = Math.floor(Math.random() * 40) + 20 // Longitud entre 20-60px (más corta)
        this.speed = Math.random() * 20 + 15 // Velocidad más rápida
        this.size = Math.random() * 0.9 + 0.4 // Tamaño más pequeño
        this.tail = [] // Estela
        this.opacity = 1
        this.fadeSpeed = Math.random() * 0.05 + 0.03 // Velocidad de desvanecimiento
        this.active = true
        this.fading = false // Nuevo: indica si la estrella está en proceso de desvanecimiento
      }

      update() {
        if (!this.active) return

        // Si la estrella está en proceso de desvanecimiento, solo reducir la opacidad
        if (this.fading) {
          this.opacity = Math.max(0, this.opacity - this.fadeSpeed * 2)

          // Cuando la opacidad llega a cero, resetear la estrella
          if (this.opacity <= 0) {
            this.active = false
            this.tail = [] // Limpiar la estela completamente
            return
          }

          // Actualizar la opacidad de todos los puntos de la estela
          this.tail.forEach((point) => {
            point.alpha = point.alpha * 0.9 // Desvanecer más rápido
          })

          return
        }

        // Mover la estrella
        if (this.isLeft) {
          this.x += this.speed
          this.y += this.speed * 0.2 // Ligera inclinación hacia abajo

          // Comprobar si ha llegado a su máximo recorrido
          if (this.x >= this.maxX) {
            this.fading = true // Comenzar a desvanecer
          }
        } else {
          this.x -= this.speed
          this.y += this.speed * 0.2

          // Comprobar si ha llegado a su máximo recorrido
          if (this.x <= this.maxX) {
            this.fading = true // Comenzar a desvanecer
          }
        }

        // Guardar posiciones para la estela
        this.tail.unshift({ x: this.x, y: this.y, alpha: this.opacity })

        // Limitar el tamaño de la estela
        if (this.tail.length > this.length) {
          this.tail.pop()
        }

        // Reducir la opacidad de la estela gradualmente
        this.tail.forEach((point, index) => {
          point.alpha = ((this.tail.length - index) / this.tail.length) * this.opacity
        })
      }

      draw(ctx) {
        if (this.tail.length < 2) return

        ctx.strokeStyle = color
        ctx.lineWidth = this.size
        ctx.beginPath()

        // Dibujar la estela con opacidad variable
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

    // Crear estrellas fugaces
    const stars = []
    const maxStars = 8 // Reducido el número máximo de estrellas

    // Determinar qué lados usar según la prop
    const useLeft = side === "left" || side === "both"
    const useRight = side === "right" || side === "both"

    // Función para añadir una nueva estrella
    const addStar = () => {
      // Contar estrellas activas (no en proceso de desvanecimiento)
      const activeStars = stars.filter((star) => star.active && !star.fading).length

      if (activeStars < maxStars / 2) {
        // Buscar primero una estrella inactiva para reutilizar
        const inactiveStar = stars.find((star) => !star.active)

        if (inactiveStar) {
          inactiveStar.reset()
        } else if (stars.length < maxStars) {
          // Si no hay estrellas inactivas y no hemos alcanzado el máximo, crear una nueva
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

    // Añadir estrellas periódicamente con frecuencia variable
    const addStarWithRandomDelay = () => {
      const randomDelay = Math.random() * (frequency * 1000) + frequency * 500
      setTimeout(() => {
        addStar()
        addStarWithRandomDelay()
      }, randomDelay)
    }

    // Iniciar el proceso de añadir estrellas
    addStarWithRandomDelay()

    // Animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar y dibujar estrellas
      stars.forEach((star) => {
        star.update()
        star.draw(ctx)
      })

      // Limpiar estrellas inactivas periódicamente para evitar acumulación
      if (Math.random() < 0.01) {
        // 1% de probabilidad cada frame
        const activeStarsCount = stars.filter((star) => star.active).length
        if (activeStarsCount < maxStars / 4) {
          // Solo limpiar si hay pocas estrellas activas
          stars.length = stars.filter((star) => star.active).length
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Limpieza
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [side, frequency, speed, color])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" style={{ opacity: 0.8 }} />
}

export default ShootingStars