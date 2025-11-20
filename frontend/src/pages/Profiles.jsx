import { useEffect } from "react"
import { useState } from "react"

import ProfileModal from "../components/ProfileModal"
import ProfileCard from "../components/ProfileCard"
import Erro from "./Erro"
import { ArrowUpDown, SortAsc, SortDesc, Users } from "lucide-react"

export default function Profiles() {

    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedProfile, setSelectedProfile] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [erro, setErro] = useState(null)
    const [sortOrder, setSortOrder] = useState('id')
    const [filteredProfiles, setFilteredProfiles] = useState([])


    const API_URL = import.meta.env.VITE_API_URL

    async function fetchProfiles() {
        setErro(null)
        try {
            const res = await fetch(`${API_URL}/profissionais`)
            const data = await res.json()
            setProfiles(data)

        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setErro("Erro ao buscar dados.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchProfiles()
    }, [])

    const sortProfiles = (profilesToSort, order) => {
        const sorted = [...profilesToSort]

        switch (order) {
            case 'name-asc':
                return sorted.sort((a, b) => a.nome.localeCompare(b.nome))
            case 'name-desc':
                return sorted.sort((a, b) => b.nome.localeCompare(a.nome))
            case 'id':
            default:
                return sorted.sort((a, b) => a.id - b.id)
        }
    }

    useEffect(() => {
        if (profiles.length > 0) {
            const sorted = sortProfiles(profiles, sortOrder)
            setFilteredProfiles(sorted)
        }
    }, [sortOrder, profiles])

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg
                        className="animate-spin h-12 w-12 text-gray-500"
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
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <span className="text-gray-500 text-2xl font-light font-body">Carregando...</span>
                </div>
            </main>
        )
    }
    if (erro)
        return <Erro
            message={erro}
            onRetry={fetchProfiles}
        />


    return (
        <main className="bg-gradient-to-br from-gray-200 to-gray-100 ">
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-3">
                            <h1 className="font-logo text-[#f83f32] font-bold text-5xl tracking-wide">
                                TALENT HUB
                            </h1>
                        </div>
                        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                            Descubra profissionais incríveis e conecte-se com os melhores talentos do mercado
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm">
                            <div className="flex items-center gap-2 text-sm">
                                <ArrowUpDown size={16} className="text-gray-500" />
                                <span className="text-gray-600 font-medium">Ordenar por:</span>
                                <button
                                    onClick={() => setSortOrder('id')}
                                    className={`px-3 py-1 rounded transition-all duration-200 ${sortOrder === 'id'
                                            ? 'bg-[#f83f32] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    ID
                                </button>
                                <button
                                    onClick={() => setSortOrder('name-asc')}
                                    className={`px-3 py-1 rounded transition-all duration-200 flex items-center gap-1 ${sortOrder === 'name-asc'
                                            ? 'bg-[#f83f32] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <SortAsc size={14} />
                                    A-Z
                                </button>
                                <button
                                    onClick={() => setSortOrder('name-desc')}
                                    className={`px-3 py-1 rounded transition-all duration-200 flex items-center gap-1 ${sortOrder === 'name-desc'
                                            ? 'bg-[#f83f32] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <SortDesc size={14} />
                                    Z-A
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#64748B]">
                            {filteredProfiles.length} {filteredProfiles.length === 1 ? 'perfil disponível' : 'perfis disponíveis'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredProfiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                {...profile}
                                onClick={() => {
                                    setSelectedProfile(profile)
                                    setIsModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Users className="mx-auto text-gray-300 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-500 mb-2">
                            Nenhum perfil cadastrado
                        </h3>
                        <p className="text-gray-400">
                            Em breve teremos talentos incríveis para você conhecer
                        </p>
                    </div>
                )}
            </div>

            <ProfileModal
                isOpen={isModalOpen}
                profile={selectedProfile}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedProfile(null)
                }}
            />
        </main>
    )
}