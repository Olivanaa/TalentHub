import { useEffect, useState } from "react"
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
    const [sortOrder, setSortOrder] = useState("id")
    const [filteredProfiles, setFilteredProfiles] = useState([])

    const API_URL = import.meta.env.VITE_API_URL

    async function fetchProfiles() {
        setErro(null)
        try {
            const res = await fetch(`${API_URL}/profissionais`)
            const data = await res.json()
            setProfiles(data)
        } catch (err) {
            console.error("Erro ao buscar dados:", err)
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
            case "name-asc":
                return sorted.sort((a, b) => a.nome.localeCompare(b.nome))
            case "name-desc":
                return sorted.sort((a, b) => b.nome.localeCompare(a.nome))
            case "id":
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

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedProfile(null)
    }

    const handleProfileClick = (profile) => {
        setSelectedProfile(profile)
        setIsModalOpen(true)
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#0d0d0d] dark:to-[#1a1a1a] flex items-center justify-center transition-colors">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f83f32]"></div>
                    <span className="text-gray-500 dark:text-gray-300 text-xl font-light">Carregando...</span>
                </div>
            </main>
        )
    }

    if (erro)
        return <Erro message={erro} onRetry={fetchProfiles} />

    return (
        <main className="bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#0f0f0f] dark:to-[#1c1c1c] transition-colors duration-300 min-h-screen">
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
                    <div className="flex justify-center items-center gap-3">
                        <h1 className="font-logo text-[#f83f32] dark:text-[#ff5e50] font-bold text-5xl tracking-wide">
                            TALENT HUB
                        </h1>
                    </div>
                    <p className="text-lg text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">
                        Descubra profissionais incríveis e conecte-se com os melhores talentos do mercado
                    </p>
                </div>
                <div className="mt-4 flex justify-center pb-6">
                    <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-2 shadow-sm transition-colors">
                        <div className="flex items-center gap-2 text-sm">
                            <ArrowUpDown size={16} className="text-gray-600 dark:text-gray-300" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Ordenar por:</span>
                            
                            {[
                                { id: "id", label: "ID" },
                                { id: "name-asc", label: "A-Z", icon: <SortAsc size={14} /> },
                                { id: "name-desc", label: "Z-A", icon: <SortDesc size={14} /> },
                            ].map(btn => (
                                <button
                                    key={btn.id}
                                    onClick={() => setSortOrder(btn.id)}
                                    className={`px-3 py-1 rounded flex items-center gap-1 transition-all 
                                    ${sortOrder === btn.id
                                        ? "bg-[#f83f32] text-white"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"}`}
                                >
                                    {btn.icon} {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center pb-8">
                    <p className="text-sm text-[#64748B] dark:text-gray-400">
                        {filteredProfiles.length} {filteredProfiles.length === 1 ? "perfil disponível" : "perfis disponíveis"}
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredProfiles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {filteredProfiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                {...profile}
                                onClick={() => handleProfileClick(profile)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Users className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
                        <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-300 mb-2">
                            Nenhum perfil cadastrado
                        </h3>
                        <p className="text-gray-400 dark:text-gray-500">
                            Em breve teremos talentos incríveis para você conhecer
                        </p>
                    </div>
                )}
            </div>

            <ProfileModal
                isOpen={isModalOpen}
                profile={selectedProfile}
                onClose={handleCloseModal}
            />
        </main>
    )
}