import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loginError, setLoginError] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email || !senha) {
            setLoginError("Por favor, preencha todos os campos")
            return;
        }

        setLoginError("")

        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            })

            const data = await response.json()

            localStorage.setItem("token", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))

            navigate("/profiles")
        } catch (err) {
            console.error("Erro ao fazer login:", err)
            setLoginError("Erro ao tentar logar. Tente novamente mais tarde.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section
            className="
                min-h-screen flex items-center justify-center 
                bg-linear-to-br from-[#F2F6FF] to-[#E8EEFF] 
                dark:from-[#0f0f0f] dark:to-[#1a1a1a]
                px-6 py-12 transition-colors duration-300
            "
        >
            <div
                className="
                    bg-white/70 dark:bg-gray-900/70 
                    backdrop-blur-md shadow-lg rounded-2xl 
                    p-10 max-w-md w-full 
                    border border-[#e3e8f7] dark:border-gray-700
                    transition-colors duration-300
                "
            >
                <h1
                    className="
                        font-logo font-bold text-4xl text-center 
                        text-[#f83f32] dark:text-[#fb634f] 
                        mb-6 drop-shadow-sm
                    "
                >
                    TALENT HUB
                </h1>

                <div
                    className="
                        w-24 h-1.5 bg-[#F97316] dark:bg-[#fb634f] 
                        rounded-full mx-auto mb-10
                    "
                ></div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        {loginError && (
                            <p className="text-red-500 text-sm text-center">{loginError}</p>
                        )}
                        <label
                            htmlFor="email"
                            className="font-body font-semibold text-[#334155] dark:text-gray-200"
                        >
                            E-mail
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="
                                px-4 py-3 rounded-lg 
                                bg-white dark:bg-gray-800
                                border border-[#cfd6e6] dark:border-gray-600
                                text-[#334155] dark:text-gray-200
                                placeholder-gray-400 dark:placeholder-gray-500
                                focus:border-[#F97316] dark:focus:border-[#fb634f]
                                focus:ring-2 focus:ring-[#F97316]/40 dark:focus:ring-[#fb634f]/40
                                outline-none transition-all
                            "
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="font-body font-semibold text-[#334155] dark:text-gray-200"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="
                                px-4 py-3 rounded-lg
                                bg-white dark:bg-gray-800
                                border border-[#cfd6e6] dark:border-gray-600
                                text-[#334155] dark:text-gray-200
                                placeholder-gray-400 dark:placeholder-gray-500
                                focus:border-[#F97316] dark:focus:border-[#fb634f]
                                focus:ring-2 focus:ring-[#F97316]/40 dark:focus:ring-[#fb634f]/40
                                outline-none transition-all
                            "
                            placeholder="Sua senha"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={` w-full bg-[#F97316] dark:bg-[#fb634f]
                            text-white font-semibold text-lg 
                            px-6 py-3 rounded-lg transform transition shadow-md 
                            ${isLoading ? 
                                "opacity-70 cursor-not-allowed" : 
                                "hover:bg-[#FB923C] dark:hover:bg-[#ff7a69] cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                            }`}

                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Entrando...
                            </span>

                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>
            </div>
        </section>
    )
}
