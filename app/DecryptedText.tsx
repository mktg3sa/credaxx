"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
}

/**
 * DecryptedText
 *
 * Props:
 * - text: string
 * - speed?: number
 * - maxIterations?: number
 * - sequential?: boolean
 * - revealDirection?: "start" | "end" | "center"
 * - useOriginalCharsOnly?: boolean
 * - characters?: string
 * - className?: string          (applied to revealed/normal letters)
 * - parentClassName?: string    (applied to parent span)
 * - encryptedClassName?: string (applied to encrypted letters)
 * - animateOn?: "view" | "hover"  (default: "hover")
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover", // Garantir que o padrão seja "hover"
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const [isScrambling, setIsScrambling] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false) // for "view" mode
  const containerRef = useRef(null)

  useEffect(() => {
    let interval
    let currentIteration = 0

    const getNextIndex = (revealedSet) => {
      const textLength = text.length
      switch (revealDirection) {
        case "start":
          return revealedSet.size
        case "end":
          return textLength - 1 - revealedSet.size
        case "center": {
          const middle = Math.floor(textLength / 2)
          const offset = Math.floor(revealedSet.size / 2)
          const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1

          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex
          }

          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i
          }
          return 0
        }
        default:
          return revealedSet.size
      }
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("")

    const shuffleText = (originalText, currentRevealed) => {
      if (useOriginalCharsOnly) {
        const positions = originalText.split("").map((char, i) => ({
          char,
          isSpace: char === " ",
          index: i,
          isRevealed: currentRevealed.has(i),
        }))

        const nonSpaceChars = positions.filter((p) => !p.isSpace && !p.isRevealed).map((p) => p.char)

        for (let i = nonSpaceChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]]
        }

        let charIndex = 0
        return positions
          .map((p) => {
            if (p.isSpace) return " "
            if (p.isRevealed) return originalText[p.index]
            return nonSpaceChars[charIndex++]
          })
          .join("")
      } else {
        return originalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " "
            if (currentRevealed.has(i)) return originalText[i]
            return availableChars[Math.floor(Math.random() * availableChars.length)]
          })
          .join("")
      }
    }

    if (isHovering) {
      setIsScrambling(true)
      // Velocidade mais rápida para uma experiência mais fluida no hover
      const animationSpeed = Math.max(15, speed * 0.7)

      interval = setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          if (sequential) {
            if (prevRevealed.size < text.length) {
              const nextIndex = getNextIndex(prevRevealed)
              const newRevealed = new Set(prevRevealed)
              newRevealed.add(nextIndex)
              setDisplayText(shuffleText(text, newRevealed))
              return newRevealed
            } else {
              clearInterval(interval)
              setIsScrambling(false)
              return prevRevealed
            }
          } else {
            setDisplayText(shuffleText(text, prevRevealed))
            currentIteration++
            // Aumentar o número de iterações para um efeito mais dramático
            const effectiveMaxIterations = maxIterations * 1.5
            if (currentIteration >= effectiveMaxIterations) {
              clearInterval(interval)
              setIsScrambling(false)
              setDisplayText(text)
            }
            return prevRevealed
          }
        })
      }, animationSpeed)
    } else {
      setDisplayText(text)
      setRevealedIndices(new Set())
      setIsScrambling(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly])

  useEffect(() => {
    if (animateOn !== "view") return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true) // trigger the decrypteion
          setHasAnimated(true) // ensure it runs only once
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const currentRef = containerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [animateOn, hasAnimated])

  const hoverProps = {
    onMouseEnter: () => {
      setIsHovering(true)
      // Resetar o estado para garantir que a animação ocorra novamente
      setHasAnimated(false)
    },
    onMouseLeave: () => setIsHovering(false),
    onTouchStart: () => {
      setIsHovering(true)
      setHasAnimated(false)
    },
    onTouchEnd: () => setIsHovering(false),
  }

  return (
    <motion.span
      className={`${parentClassName} hover:cursor-pointer`}
      ref={containerRef}
      style={styles.wrapper}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      {...hoverProps}
      {...props}
    >
      <span style={styles.srOnly}>{displayText}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering

          return (
            <motion.span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
            >
              {char}
            </motion.span>
          )
        })}
      </span>
    </motion.span>
  )
}
