import { AlertCircle, Home, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Erro({ onRetry }) {
    return (
        <main className="bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#0f0f0f] dark:to-[#1c1c1c] transition-colors duration-300 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
            <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center bg-red-500/40 dark:bg-red-900/40 rounded-full">
                            <AlertCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100">
                            Oops!
                        </h2>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-600 dark:text-gray-300  mb-4">
                            Algo deu errado
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-300  max-w-2xl mx-auto">Não conseguimos carregar os dados solicitados.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        {onRetry && (
                            <button
                                onClick={onRetry}
                                className="bg-[#f83f32]  text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e6352a] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                            >
                                <RefreshCw size={18} />
                                <span>Tentar Novamente</span>
                            </button>
                        )}
                        <Link to="/" className="flex-1">
                            <button className="w-full rounded-full font-semibold bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2 justify-center px-8 py-4 space-x-2">
                                <Home size={18} />
                                <span>Voltar para Home</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}