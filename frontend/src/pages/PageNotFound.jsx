import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PageNotFound() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c]" 
        : "bg-gradient-to-br from-gray-200 to-gray-100"
    }`}>
      <div className="text-center p-8">
        <h1 className={`text-6xl font-bold mb-4 ${
          theme === "dark" ? "text-[#ff5e50]" : "text-[#f83f32]"
        }`}>
          404
        </h1>
        <h2 className={`text-2xl font-semibold mb-2 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}>
          Página não encontrada
        </h2>
        <p className={`mb-6 max-w-md ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}>
          Desculpe, a página que você está procurando não existe.
        </p>
        <Link
          to="/"
          className={`inline-block text-white px-6 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg ${
            theme === "dark" 
              ? "bg-[#ff5e50] hover:bg-[#ff4a3a]" 
              : "bg-[#f83f32] hover:bg-[#e6352a]"
          }`}
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}