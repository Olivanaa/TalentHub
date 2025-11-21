import hero_image from "../assets/hero_img.png";

export default function Home() {
    return (
        <section className="min-h-screen flex items-center justify-center 
            bg-[#F2F6FF] dark:bg-[#0f0f0f] 
            bg-linear-to-br from-[#F2F6FF] to-[#E8EEFF]
            dark:from-[#0f0f0f] dark:to-[#1a1a1a]
            transition-colors duration-300
            px-6 py-12">

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 lg:space-y-10 px-4 lg:px-0">
                    <h1 className="font-logo font-bold text-4xl lg:text-6xl 
                        text-[#f83f32] dark:text-[#fb634f] drop-shadow-sm">
                        TALENT HUB
                    </h1>

                    <div className="w-24 h-1.5 bg-[#F97316] dark:bg-[#fb634f] rounded-full"></div>

                    <h2 className="font-title text-3xl lg:text-4xl font-bold
                        text-[#808ea0] dark:text-gray-300 leading-snug">
                        Sua próxima conexão pode ser a chave para um futuro mais justo.
                    </h2>

                    <p className="font-body text-lg lg:text-xl 
                        text-[#334155] dark:text-gray-400 
                        leading-relaxed max-w-xl">
                        Conecte-se a uma comunidade global que valoriza o talento diverso 
                        e colabora para um impacto que vai além do currículo.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="bg-[#F97316] dark:bg-[#fb634f] 
                            text-white font-semibold text-lg px-8 py-3 rounded-lg
                            hover:bg-[#FB923C] dark:hover:bg-[#ff846d]
                            transition-all duration-300 hover:scale-105 shadow-md">
                            Inscreva-se
                        </button>

                        <button className="bg-[#F97316] dark:bg-[#fb634f] 
                            text-white font-semibold text-lg px-8 py-3 rounded-lg
                            hover:bg-[#FB923C] dark:hover:bg-[#ff846d]
                            transition-all duration-300 hover:scale-105">
                            Saiba mais
                        </button>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                    <img
                        src={hero_image}
                        alt="Hero"
                        className="w-full max-w-[650px] lg:max-w-[900px] drop-shadow-2xl"
                    />
                </div>
            </div>
        </section>
    )
}
