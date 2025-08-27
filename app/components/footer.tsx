"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"

export function Footer() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar o botão apenas quando o usuário rolar mais de 100px
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    // Adicionar event listener
    window.addEventListener("scroll", handleScroll)

    // Verificar a posição inicial
    handleScroll()

    // Limpar event listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Função para lidar com o clique em links de contato
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Chama a função de conversão do Google Ads
    if (typeof window !== "undefined" && typeof (window as any).gtag_report_conversion === "function") {
      // Não previne o comportamento padrão aqui, pois o gtag_report_conversion já lida com o redirecionamento
      ;(window as any).gtag_report_conversion(e.currentTarget.href)
      return false
    }
  }

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="mb-3 sm:mb-4">
              <Image
                src="https://concimedbr.com.br/bot-concimed/outros/Logo-1.svg"
                alt="Credaxx"
                width={150}
                height={40}
                className="h-8 w-auto"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-gray-400 sm:text-base">
              Inovação Financeira de
              <br />
              Alta Performance
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Soluções</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  onClick={scrollToSection("services")}
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                >
                  Gestão de Capital
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={scrollToSection("services")}
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                >
                  Investimentos Estratégicos
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={scrollToSection("services")}
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                >
                  Consultoria Empresarial
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Empresa</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  onClick={scrollToSection("about")}
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <Link
                  href="https://grupo3sa.empregare.com/pt-br/vagas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                >
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg">Contato</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contato@credaxx.com"
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                  onClick={handleContactClick}
                >
                  comercial@credaxx.com.br
                </a>
              </li>
              <li>
                <a
                  href="tel:+5561998051760"
                  className="text-sm text-gray-400 transition-colors hover:text-primary sm:text-base"
                  onClick={handleContactClick}
                >
                  +55 (61) 9 98051760
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-400 sm:text-base">
                  SHIGS Qd. 502 Bloco B Loja 59, Parte B1, SHCS - Asa Sul, Brasília - DF, 70330-520
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 sm:pt-8" />
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center">
          <p className="text-center text-xs text-gray-400 sm:text-sm">
            © 2025 Credaxx. Todos os direitos reservados | CNPJ 42.360.849/0001-16 | Uma empresa do{" "}
            <a
              href="https://g3sa.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-primary"
            >
              Grupo 3 S/A
            </a>
          </p>
        </div>
      </div>

      {/* Botão flutuante para voltar ao topo - Movido para o lado esquerdo */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 rounded-full bg-[#f5d58f] p-3 text-black shadow-lg transition-all duration-300 hover:bg-[#e5c06a] focus:outline-none focus:ring-2 focus:ring-[#f5d58f] focus:ring-opacity-50 ${
          showButton ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  )
}
