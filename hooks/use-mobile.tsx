"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Set initial value
      checkIfMobile()

      // Add event listener for window resize with debounce for performance
      let timeoutId: NodeJS.Timeout
      const handleResize = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(checkIfMobile, 100)
      }

      window.addEventListener("resize", handleResize)

      // Clean up event listener
      return () => {
        window.removeEventListener("resize", handleResize)
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return isMobile
}
