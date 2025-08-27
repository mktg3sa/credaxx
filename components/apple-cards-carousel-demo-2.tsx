"use client"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"

export default function AppleCardsCarouselDemo2() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />)

  return (
    <div className="h-full w-full py-10">
      <div className="mx-auto max-w-4xl px-4 text-center mb-8">
        <h2 className="mb-4 text-xl font-bold text-white font-sans md:text-4xl">Nossa Equipe</h2>
        <p className="text-base text-gray-300 md:text-lg">
          Conheça os diretores que lideram a Credaxx com excelência e visão estratégica
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  )
}

const data = [
  {
    category: "Eduardo Araújo",
    title: "Sócio-Diretor",
    src: "https://conteudo.credaxx.com.br/conteudo-site/eduardo.png",
    content: (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="w-full text-center text-[0.6rem] md:text-lg">
          Contador com MBA em Controladoria, Auditoria e Finanças. Sólida experiência em controladoria, gestão de
          processos e viabilidade financeira.
        </p>
      </div>
    ),
  },
  {
    category: "William Almeida",
    title: "Sócio-Diretor",
    src: "https://conteudo.credaxx.com.br/conteudo-site/william.png",
    content: (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="w-full text-center text-[0.6rem] md:text-lg">
          Sócio-diretor | Contador com MBA em Gestão Financeira e Gerenciamento de Projetos. Especialista em
          instituições financeiras, mercado de capitais e visão organizacional estratégica.
        </p>
      </div>
    ),
  },
  {
    category: "Rodrigo Dias",
    title: "Gerente de operações",
    src: "https://conteudo.credaxx.com.br/conteudo-site/rodrigo.png",
    content: (
      <div className="flex w-full flex-col items-center justify-center">
        <p className="w-full text-center text-[0.6rem] md:text-lg">
          Profissional com mais de 20 anos de experiência em finanças e automação de processos. Formação em Ciências
          Contábeis, com pós em Controladoria e Finanças (FGV) e MBA em Economia e Banking (USP). Foco em eficiência
          operacional e soluções tecnológicas de alta performance.
        </p>
      </div>
    ),
  },
]
