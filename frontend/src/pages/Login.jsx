import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/profiles");
        } catch (err) {
            console.error("Erro ao fazer login:", err);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2F6FF] to-[#E8EEFF] px-6 py-12">
            <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-md w-full border border-[#e3e8f7]">
                <h1 className="font-logo font-bold text-4xl text-center text-[#f83f32] mb-6 drop-shadow-sm">
                    TALENT HUB
                </h1>

                <div className="w-24 h-1.5 bg-[#F97316] rounded-full mx-auto mb-10"></div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-body text-[#334155] font-semibold">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-[#cfd6e6] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 outline-none transition-all text-[#334155]"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-body text-[#334155] font-semibold">Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-[#cfd6e6] focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 outline-none transition-all text-[#334155]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#F97316] text-white font-semibold text-lg px-6 py-3 rounded-lg hover:bg-[#FB923C] transition-all duration-300 hover:scale-[1.02] shadow-md"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </section>
    );
}
