import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileCard from "../components/ProfileCard"
import { Search, Users, ArrowLeft } from "lucide-react"
import ProfileModal from "../components/ProfileModal"
import Erro from "./Erro"
import { useFilters } from "../hooks/useFilters"
import FilterComponent from "../components/FilterComponent"

export default function SearchPage() {
  const { searchProfile } = useParams()
  const navigate = useNavigate()
  const { areas, cidades, habilidades } = useFilters()

  const [profiles, setProfiles] = useState([])
  const [filteredProfiles, setFilteredProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    area: "",
    cidade: "",
    tecnologia: ""
  })

  const API_URL = import.meta.env.VITE_API_URL

  const applySearch = (data, searchTerm) => {
    if (!searchTerm) return data

    const term = searchTerm.toLowerCase()
    return data.filter(profile => {
      const mainFields =
        profile.nome?.toLowerCase().includes(term) ||
        profile.cargo?.toLowerCase().includes(term) ||
        profile.area?.toLowerCase().includes(term) ||
        profile.localizacao?.toLowerCase().includes(term) ||
        profile.resumo?.toLowerCase().includes(term)

      const techSkills = profile.habilidadesTecnicas?.some(skill =>
        skill.toLowerCase().includes(term)
      )

      const softSkills = profile.softSkills?.some(skill =>
        skill.toLowerCase().includes(term)
      )

      const experiences = profile.experiencias?.some(exp =>
        exp.empresa?.toLowerCase().includes(term) ||
        exp.cargo?.toLowerCase().includes(term) ||
        exp.descricao?.toLowerCase().includes(term)
      )

      const education = profile.formacao?.some(edu =>
        edu.curso?.toLowerCase().includes(term) ||
        edu.instituicao?.toLowerCase().includes(term)
      )

      const projects = profile.projetos?.some(proj =>
        proj.titulo?.toLowerCase().includes(term) ||
        proj.descricao?.toLowerCase().includes(term)
      )

      const certifications = profile.certificacoes?.some(cert =>
        cert.toLowerCase().includes(term)
      )

      const languages = profile.idiomas?.some(lang =>
        lang.idioma?.toLowerCase().includes(term) ||
        lang.nivel?.toLowerCase().includes(term)
      )

      const interests = profile.areaInteresses?.some(interest =>
        interest.toLowerCase().includes(term)
      )

      return mainFields || techSkills || softSkills || experiences ||
        education || projects || certifications || languages || interests
    })
  }

  const applyFilters = (data, filters) => {
    return data.filter(profile => {
      const areaMatch = !filters.area ||
        (profile.area && profile.area.toLowerCase().includes(filters.area.toLowerCase()))

      const cidadeMatch = !filters.cidade ||
        (profile.localizacao && profile.localizacao.toLowerCase().includes(filters.cidade.toLowerCase()))

      const tecnologiaMatch = !filters.tecnologia ||
        (profile.habilidadesTecnicas &&
          profile.habilidadesTecnicas.some(skill =>
            skill.toLowerCase().includes(filters.tecnologia.toLowerCase())
          ))

      return areaMatch && cidadeMatch && tecnologiaMatch
    })
  }

  async function fetchProfiles() {
    setError(null)
    try {
      const res = await fetch(`${API_URL}/profissionais`)
      const data = await res.json()
      setProfiles(data)

      let filtered = applySearch(data, searchProfile)
      filtered = applyFilters(filtered, activeFilters)
      setFilteredProfiles(filtered)

    } catch (err) {
      console.error("Erro ao buscar dados:", err)
      setError("Erro ao buscar dados.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (profiles.length > 0) {
      let filtered = applySearch(profiles, searchProfile)
      filtered = applyFilters(filtered, activeFilters)
      setFilteredProfiles(filtered)
    }
  }, [activeFilters, searchProfile, profiles])

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
  }

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfile(null)
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    setLoading(true)
    fetchProfiles()
  }, [searchProfile])

  const hasActiveFilters = activeFilters.area || activeFilters.cidade || activeFilters.tecnologia

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#0d0d0d] dark:to-[#1a1a1a] flex items-center justify-center transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#f83f32]"></div>
          <span className="text-gray-500 dark:text-gray-300 text-xl font-light">Buscando...</span>
        </div>
      </main>
    )
  }

  if (error)
    return <Erro onRetry={fetchProfiles} />

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#0f0f0f] dark:to-[#1c1c1c] transition-colors duration-300">
      <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#ff5e50] transition-colors duration-300 font-medium"
            >
              <ArrowLeft size={20} />
              Voltar
            </button>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-3">
              <Search className="text-[#f83f32] dark:text-[#ff5e50]" size={32} />
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                Resultados da Busca
              </h1>
            </div>

            {searchProfile && (
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Resultados para: <span className="text-[#f83f32] dark:text-[#ff5e50] font-semibold">"{decodeURIComponent(searchProfile)}"</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterComponent
          onFilterChange={handleFilterChange}
          availableFilters={{
            areas: areas,
            cidades: cidades,
            habilidades: habilidades
          }}
        />

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filteredProfiles.length} {filteredProfiles.length === 1 ? 'perfil encontrado' : 'perfis encontrados'}
            {hasActiveFilters && " (filtrados)"}
          </p>
        </div>

        {error ? (
          <div className="text-center py-16">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-700 dark:text-red-300">{error}</p>
              <button
                onClick={fetchProfiles}
                className="mt-4 bg-[#f83f32] dark:bg-[#ff5e50] text-white px-6 py-2 rounded-lg hover:bg-[#e6352a] dark:hover:bg-[#ff4a3a] transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : filteredProfiles.length > 0 ? (
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
              {hasActiveFilters ? "Nenhum resultado encontrado com os filtros aplicados" : "Nenhum resultado encontrado"}
            </h3>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              {hasActiveFilters ? "Tente ajustar os filtros para ver mais resultados" : "Não encontramos perfis correspondentes à sua busca"}
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