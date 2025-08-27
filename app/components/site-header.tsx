"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/signin" || pathname === "/register"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar o menu móvel quando a página é rolada
  useEffect(() => {
    const handleScrollForMenu = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("scroll", handleScrollForMenu)
    return () => window.removeEventListener("scroll", handleScrollForMenu)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Função para lidar com o clique no botão Fale Conosco
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Chama a função de conversão do Google Ads
    if (typeof window !== "undefined" && typeof (window as any).gtag_report_conversion === "function") {
      ;(window as any).gtag_report_conversion(
        "https://wa.me/5561998051760?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Quero%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Credaxx.",
      )
    } else {
      // Fallback caso a função não esteja disponível
      window.location.href =
        "https://wa.me/5561998051760?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Quero%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Credaxx."
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full border-b border-gray-900/20 ${
        isScrolled ? "bg-[#09090b]" : "bg-[#09090b]/95 backdrop-blur supports-[backdrop-filter]:bg-[#09090b]/60"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Image
              src="https://concimedbr.com.br/bot-concimed/outros/Logo-1.svg"
              alt="Credaxx"
              width={150}
              height={50}
              className="h-6 w-auto sm:h-8"
              priority
            />
          </motion.div>
        </Link>

        <nav className="hidden items-center space-x-4 md:flex lg:space-x-8">
          <Link
            href="#about"
            className="text-sm font-medium text-white transition-colors hover:text-gray-300 lg:text-base"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("about")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            Sobre nós
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-white transition-colors hover:text-gray-300 lg:text-base"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("services")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            Soluções
          </Link>
          <Link
            href="#problems"
            className="text-sm font-medium text-white transition-colors hover:text-gray-300 lg:text-base"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("problems")
              if (element) {
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            Desafios
          </Link>
          <a
            href="https://wa.me/5561998051760?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Quero%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Credaxx."
            onClick={handleContactClick}
            className="rounded-md bg-[#FBD484] px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-[#e5c06a] sm:px-4 lg:text-base"
          >
            Fale Conosco
          </a>
        </nav>

        <button
          className="touch-manipulation p-2 text-white md:hidden"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-900/20 bg-[#09090b] md:hidden"
        >
          <div className="mx-auto w-full max-w-7xl flex flex-col space-y-3 py-4 px-4">
            <Link
              href="#about"
              className="touch-manipulation px-2 py-3 font-medium text-white transition-colors hover:text-gray-300"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                const element = document.getElementById("about")
                if (element) {
                  const headerOffset = 80
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Sobre nós
            </Link>
            <Link
              href="#services"
              className="touch-manipulation px-2 py-3 font-medium text-white transition-colors hover:text-gray-300"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                const element = document.getElementById("services")
                if (element) {
                  const headerOffset = 80
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Soluções
            </Link>
            <Link
              href="#problems"
              className="touch-manipulation px-2 py-3 font-medium text-white transition-colors hover:text-gray-300"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                const element = document.getElementById("problems")
                if (element) {
                  const headerOffset = 80
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Desafios
            </Link>
            <a
              href="https://wa.me/5561998051760?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Quero%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Credaxx."
              onClick={(e) => {
                handleContactClick(e)
                setIsMobileMenuOpen(false)
              }}
              className="touch-manipulation rounded-md bg-[#FBD484] px-4 py-3 text-center font-medium text-black transition-colors hover:bg-[#e5c06a]"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
