"use client"

import { useEffect } from "react"

export function TypebotBubble() {
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== "undefined") {
      const typebotInitScript = document.createElement("script")
      typebotInitScript.type = "module"
      typebotInitScript.innerHTML = `import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.3/dist/web.js'

    Typebot.initBubble({
      typebot: "atendimento-credaxx",
      previewMessage: {
        message: "Vamos conversar?",
        autoShowDelay: 1000,
        avatarUrl:
          "https://s3.typebot.io/public/workspaces/cm15h2y7r001ti4r1ep08ckiw/typebots/a0a1bcnhi9v3u606iroqdfif/hostAvatar?v=1743187449914",
      },
      theme: { button: { backgroundColor: "#000000" } },
    });
    `
      document.body.append(typebotInitScript)
    }

    // Função de limpeza para remover o script se o componente for desmontado
    return () => {
      const scripts = document.querySelectorAll('script[type="module"]')
      scripts.forEach((script) => {
        if (script.innerHTML.includes("Typebot.initBubble")) {
          script.remove()
        }
      })
    }
  }, []) // Array de dependências vazio para garantir que o efeito só seja executado uma vez

  return null // Este componente não renderiza nada visível
}
