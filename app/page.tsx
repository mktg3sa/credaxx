"use client"

import { SiteHeader } from "./components/site-header"
import { motion, useScroll, useTransform } from "framer-motion"
import { Footer } from "./components/footer"
import {
  Zap,
  DollarSign,
  Shield,
  BarChart3,
  Building,
  Users,
  Lightbulb,
  PieChart,
  Shuffle,
  CreditCard,
  Calculator,
  FileText,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import DecryptedText from "./DecryptedText"
import AppleCardsCarouselDemo2 from "@/components/apple-cards-carousel-demo-2"
import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Threads from "./components/Threads"

import "./globals.css"

export default function Home() {
  const [activeServiceIndices, setActiveServiceIndices] = useState<number[]>([])
  const [activeProblemIndices, setActiveProblemIndices] = useState<number[]>([])
  const isMobile = useMobile()
  const { scrollYProgress } = useScroll()
  const heroRef = useRef<HTMLElement>(null)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const [isLoading, setIsLoading] = useState(true)

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleServiceClick = (index: number) => {
    if (isMobile) {
      // No mobile, apenas adiciona o índice se não estiver já ativo
      if (!activeServiceIndices.includes(index)) {
        setActiveServiceIndices([...activeServiceIndices, index])
      }
    } else {
      // No desktop, comportamento normal de hover
      if (activeServiceIndices.includes(index)) {
        setActiveServiceIndices(activeServiceIndices.filter((i) => i !== index))
      } else {
        setActiveServiceIndices([...activeServiceIndices, index])
      }
    }
  }

  const handleProblemClick = (index: number) => {
    if (isMobile) {
      // No mobile, apenas adiciona o índice se não estiver já ativo
      if (!activeProblemIndices.includes(index)) {
        setActiveProblemIndices([...activeProblemIndices, index])
      }
    } else {
      // No desktop, comportamento normal de hover
      if (activeProblemIndices.includes(index)) {
        setActiveProblemIndices(activeProblemIndices.filter((i) => i !== index))
      } else {
        setActiveProblemIndices([...activeProblemIndices, index])
      }
    }
  }

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      const headerOffset = 80
      const elementPosition = servicesSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  // Adicionar classe CSS personalizada para dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      document.documentElement.classList.add("is-mobile-device")
    } else {
      document.documentElement.classList.remove("is-mobile-device")
    }
  }, [isMobile])

  // Lazy loading para componentes pesados
  const [showThreads, setShowThreads] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowThreads(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#09090b] z-50">
        <div className="w-16 h-16 border-4 border-[#FBD484] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 z-0">
            {showThreads && (
              <Threads
                amplitude={1}
                distance={0}
                enableMouseInteraction={!isMobile}
                color={[0.9, 0.8, 0.4]} // Golden color to match your theme
              />
            )}
          </div>

          {/* Content */}
          <motion.div
            style={{ opacity, scale }}
            className="container relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-3 px-4 text-center sm:gap-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold leading-tight tracking-tighter text-[#FBD484] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              Seu capital, nossa inteligência
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={scrollToServices}
              className="mt-6 flex items-center gap-2 rounded-md bg-[#f5d58f] px-6 py-3 font-medium text-black transition-colors hover:bg-[#e5c06a] sm:mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Saiba Mais <ChevronDown className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 md:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 text-center sm:gap-4"
          >
            <h2 className="text-xl font-bold leading-[1.1] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Nossas Soluções
            </h2>
            <p className="text-sm leading-normal text-muted-foreground sm:text-base md:text-lg">
              Recursos financeiros para <strong className="text-[#FBD484]">maximizar seus resultados</strong>
            </p>
          </motion.div>

          {/* Services - First Row */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleServiceClick(index)}
                whileHover={!isMobile ? { scale: 1.03 } : {}}
                whileTap={{ scale: 0.98 }}
                className={`service-box relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 ${
                  activeServiceIndices.includes(index) ? "active-service" : ""
                }`}
                style={{
                  backgroundColor: activeServiceIndices.includes(index) ? "#FBD484" : "",
                }}
              >
                <div
                  className={`service-icon mb-3 text-[#FBD484] sm:mb-4 ${
                    activeServiceIndices.includes(index) ? "text-gray-900" : ""
                  }`}
                >
                  {service.icon && <service.icon className="h-6 w-6 sm:h-8 sm:w-8" />}
                </div>
                <h3
                  className={`service-title mb-2 text-lg font-semibold sm:mb-3 sm:text-xl ${
                    activeServiceIndices.includes(index) ? "text-gray-900" : ""
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`service-description text-sm text-muted-foreground sm:text-base ${
                    activeServiceIndices.includes(index) ? "text-gray-800" : ""
                  }`}
                >
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Services - Second Row */}
          <div className="mt-4 flex w-full justify-center sm:mt-6">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:max-w-3xl">
              {services.slice(3, 5).map((service, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleServiceClick(index + 3)}
                  whileHover={!isMobile ? { scale: 1.03 } : {}}
                  whileTap={{ scale: 0.98 }}
                  className={`service-box relative overflow-hidden rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 ${
                    activeServiceIndices.includes(index + 3) ? "active-service" : ""
                  }`}
                  style={{
                    backgroundColor: activeServiceIndices.includes(index + 3) ? "#FBD484" : "",
                  }}
                >
                  <div
                    className={`service-icon mb-3 text-[#FBD484] sm:mb-4 ${
                      activeServiceIndices.includes(index + 3) ? "text-gray-900" : ""
                    }`}
                  >
                    {service.icon && <service.icon className="h-6 w-6 sm:h-8 sm:w-8" />}
                  </div>
                  <h3
                    className={`service-title mb-2 text-lg font-semibold sm:mb-3 sm:text-xl ${
                      activeServiceIndices.includes(index + 3) ? "text-gray-900" : ""
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`service-description text-sm text-muted-foreground sm:text-base ${
                      activeServiceIndices.includes(index + 3) ? "text-gray-800" : ""
                    }`}
                  >
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section id="problems" className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-3 text-center sm:gap-4"
          >
            <h2 className="text-xl font-bold leading-[1.1] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Desafios que Solucionamos
            </h2>
            <p className="text-sm leading-normal text-muted-foreground sm:text-base md:text-lg">
              Transformamos problemas complexos em oportunidades de crescimento
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                onClick={() => handleProblemClick(index)}
                className={`problem-box flex items-start gap-3 rounded-xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:gap-4 sm:p-6 ${
                  activeProblemIndices.includes(index) ? "active-problem" : ""
                }`}
                style={{
                  backgroundColor: activeProblemIndices.includes(index) ? "#FBD484" : "",
                }}
              >
                <div
                  className={`problem-icon mt-1 flex-shrink-0 text-[#FBD484] ${
                    activeProblemIndices.includes(index) ? "text-gray-900" : ""
                  }`}
                >
                  {problem.icon && <problem.icon className="h-5 w-5 sm:h-6 sm:w-6" />}
                </div>
                <div>
                  <h3
                    className={`problem-title mb-1 text-base font-semibold sm:mb-2 sm:text-lg ${
                      activeProblemIndices.includes(index) ? "text-gray-900" : ""
                    }`}
                  >
                    {problem.title}
                  </h3>
                  <p
                    className={`problem-description text-sm text-muted-foreground sm:text-base ${
                      activeProblemIndices.includes(index) ? "text-gray-800" : ""
                    }`}
                  >
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start justify-start gap-3 text-left sm:gap-4"
              >
                <h2 className="text-xl font-bold leading-[1.1] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Tecnologias que Utilizamos
                </h2>
                <p className="max-w-xl text-sm leading-normal text-muted-foreground sm:text-base md:text-lg">
                  Inovação e segurança para impulsionar seus resultados
                </p>
              </motion.div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 rounded-full bg-[#FBD484]/10 p-3">
                    <Shield className="h-6 w-6 text-[#FBD484]" />
                  </div>
                  <div className="text-left">
                    <h3 className="mb-2 text-lg font-semibold sm:text-xl">Segurança Avançada</h3>
                    <DecryptedText
                      text="Proteção de dados de nível bancário com criptografia de ponta a ponta e conformidade com regulamentações financeiras."
                      className="text-foreground"
                      encryptedClassName="text-[#FBD484]"
                      parentClassName="text-sm sm:text-base"
                      animateOn="hover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 rounded-full bg-[#FBD484]/10 p-3">
                    <BarChart3 className="h-6 w-6 text-[#FBD484]" />
                  </div>
                  <div className="text-left">
                    <h3 className="mb-2 text-lg font-semibold sm:text-xl">Analytics Inteligente</h3>
                    <DecryptedText
                      text="Decisões baseadas em dados precisos com algoritmos avançados de análise preditiva e machine learning."
                      speed={100}
                      maxIterations={20}
                      className="text-foreground"
                      encryptedClassName="text-[#FBD484]"
                      parentClassName="text-sm sm:text-base"
                      animateOn="hover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 rounded-full bg-[#FBD484]/10 p-3">
                    <Zap className="h-6 w-6 text-[#FBD484]" />
                  </div>
                  <div className="text-left">
                    <h3 className="mb-2 text-lg font-semibold sm:text-xl">Automação Eficiente</h3>
                    <DecryptedText
                      text="Processos otimizados para resultados rápidos com fluxos de trabalho automatizados e integração perfeita."
                      animateOn="hover"
                      revealDirection="center"
                      className="text-foreground"
                      encryptedClassName="text-[#FBD484]"
                      parentClassName="text-sm sm:text-base"
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 flex justify-center lg:order-2 lg:justify-end"
            >
              <div className="relative flex h-[300px] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl sm:h-[400px] md:h-[500px]">
                <Image
                  src="https://conteudo.credaxx.com.br/conteudo-site/notebook.png"
                  alt="Plataforma Credaxx em um MacBook Pro"
                  width={2160}
                  height={1620}
                  className="h-auto w-auto max-h-full max-w-full transform-gpu object-contain scale-100 sm:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="bg-black py-12 sm:py-16 md:py-24" id="about">
          <div className="mx-auto w-full max-w-7xl px-4">
            {/* Apple Cards Carousel */}
            <div className="dark">
              <AppleCardsCarouselDemo2 />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

const services = [
  {
    icon: CreditCard,
    title: "Equity",
    description: "Investimentos estratégicos em empresas com alto potencial de valorização e crescimento sustentável.",
  },
  {
    icon: DollarSign,
    title: "Dashboard Exclusivo",
    description: "Plataforma inteligente para analisar dados, acompanhar resultados e tomar decisões com segurança.",
  },
  {
    icon: Calculator,
    title: "Fluxo Desembolso Automático",
    description: "Automatização do processo de liberação de recursos, garantindo agilidade e precisão.",
  },
  {
    icon: FileText,
    title: "Funding Próprio",
    description: "Capital próprio para financiamento de operações, garantindo melhores taxas e condições.",
  },
  {
    icon: Users,
    title: "Securitização Própria",
    description: "Conversão de ativos financeiros em títulos negociáveis, otimizando o fluxo de caixa.",
  },
] as const

const problems = [
  {
    icon: Building,
    title: "Baixo retorno sobre capital investido",
    description: "Transformamos capital subutilizado em ativos produtivos com estratégias de alto rendimento.",
  },
  {
    icon: PieChart,
    title: "Falta de diversificação de investimentos",
    description: "Criamos portfólios balanceados que minimizam riscos e maximizam oportunidades de ganho.",
  },
  {
    icon: Lightbulb,
    title: "Excesso de burocracia e processos lentos",
    description: "Fornecemos análises baseadas em dados para fundamentar escolhas estratégicas com confiança.",
  },
  {
    icon: Shuffle,
    title: "Ineficiência na alocação de recursos",
    description: "Otimizamos a distribuição de capital para as áreas com maior potencial de retorno.",
  },
] as const
