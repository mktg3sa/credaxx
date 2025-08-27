"use client"
import React, { useEffect, useRef, useState, createContext, useContext } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Image, { type ImageProps } from "next/image"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { useMobile } from "@/hooks/use-mobile"

interface CarouselProps {
  items: JSX.Element[]
  initialScroll?: number
}

type Card = {
  src: string
  title: string
  category: string
  content?: React.ReactNode
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  useEffect(() => {
    const handleResize = () => {
      checkScrollability()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? -220 : -320
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = isMobile ? 220 : 320
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile ? 220 : 384 // Adjusted size
      const gap = isMobile ? 12 : 16
      const scrollPosition = (cardWidth + gap) * (index + 1)
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
      setCurrentIndex(index)
    }
  }

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full overflow-hidden">
        {/* Navigation buttons for desktop */}
        <div className="hidden md:block">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
              aria-label="Rolar para a esquerda"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 z-40 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
              aria-label="Rolar para a direita"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          )}
        </div>

        <div
          className="mx-auto flex w-full max-w-7xl scroll-smooth overflow-x-scroll overscroll-x-auto py-6 [scrollbar-width:none] no-scrollbar touch-pan-x snap-x snap-mandatory md:py-16"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-3 pl-4 md:gap-4">
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.05 * index, // Reduced delay for faster loading
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className={cn("rounded-3xl snap-center", index === items.length - 1 ? "pr-4" : "last:pr-[33%]")}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">{isMobile ? "Deslize" : "Use as setas para navegar"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse text-gray-400"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { onCardClose, currentIndex } = useContext(CarouselContext)
  const isMobile = useMobile()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  useOutsideClick(containerRef, () => {
    if (open) handleClose()
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    onCardClose(index)
  }

  // Conteúdo padrão se não for fornecido
  const defaultContent = (
    <p className="text-[0.6rem] md:text-lg">
      Conheça mais sobre nossa equipe e como podemos ajudar sua empresa a alcançar resultados excepcionais.
    </p>
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              ref={containerRef}
              layoutId={layout && !isMobile ? `card-${card.title}` : undefined}
              className="relative z-[60] w-full max-w-md rounded-xl bg-neutral-900 font-sans shadow-xl md:max-w-2xl md:rounded-2xl lg:max-w-3xl"
            >
              {/* Header com título e X */}
              <div className="flex items-start justify-between border-b border-gray-700 p-3 md:p-6">
                <div>
                  <motion.p
                    layoutId={layout && !isMobile ? `category-${card.title}` : undefined}
                    className="text-[0.6rem] font-medium text-white md:text-base"
                  >
                    {card.category}
                  </motion.p>
                  <motion.p
                    layoutId={layout && !isMobile ? `title-${card.title}` : undefined}
                    className="mt-1 text-[0.75rem] font-semibold text-white md:text-3xl"
                  >
                    {card.title}
                  </motion.p>
                </div>
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700 md:h-8 md:w-8"
                  onClick={handleClose}
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4 text-white md:h-5 md:w-5" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-3 text-white md:p-6">
                <div className="text-[0.6rem] md:text-lg">
                  {React.isValidElement(card.content) ? card.content : defaultContent}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.div
        layoutId={layout && !isMobile ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-72 w-52 cursor-pointer flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-neutral-800 sm:h-80 sm:w-56 md:h-[40rem] md:w-96"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        <div className="relative z-40 flex h-full w-full flex-col items-center justify-center p-4 text-center">
          <motion.p
            layoutId={layout && !isMobile ? `category-${card.category}` : undefined}
            className="w-full text-center text-[0.6rem] font-medium text-white font-sans md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout && !isMobile ? `title-${card.title}` : undefined}
            className="mt-2 w-full max-w-xs mx-auto text-center text-[0.75rem] font-semibold text-white [text-wrap:balance] font-sans md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={`${card.category} - ${card.title}`}
          fill
          className="absolute inset-0 z-10 object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </>
  )
}

export const BlurImage = ({ height, width, src, className, alt, ...rest }: ImageProps) => {
  const [isLoading, setLoading] = useState(true)
  const isMobile = useMobile()

  return (
    <Image
      className={cn("transition duration-300", isLoading && !isMobile ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src || "/placeholder.svg"}
      width={width}
      height={height}
      loading="eager" // Alterado de "lazy" para "eager" para evitar recarregamento
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  )
}
