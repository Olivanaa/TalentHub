import ExperienceCard from "./ExperienceCard"
import LanguageCard from "./LanguageCard"
import ProjectCard from "./ProjectCard"
import TrainingCard from "./TrainingCard"
import { MessageModal } from "./MessageModal"
import { X, MapPin, Briefcase, Award, Globe, BookOpen } from "lucide-react"
import { useState } from "react"

export default function ProfileModal({
    profile,
    onClose = () => {},
    isOpen = false,
    showCloseButton = true
}) {
    const [showMessageModal, setShowMessageModal] = useState(false)
    
    if (!profile || !isOpen) return null

    const handleRecommend = () => {
        alert(`Você recomendou ${profile.nome}!`)
    }

    const handleMessage = () => {
        setShowMessageModal(true)
    }

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div
                    className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl max-w-4xl w-full 
                    max-h-[90vh] overflow-hidden transition-colors"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        <div className="h-32 bg-gradient-to-r from-[#f83f32] to-[#F97316] relative">
                            <div className="absolute -bottom-12 left-8">
                                <img
                                    src={profile.foto}
                                    alt={profile.nome}
                                    className="w-24 h-24 rounded-full border-4 border-white 
                                    dark:border-[#1a1a1a] shadow-lg object-cover"
                                />
                            </div>
                        </div>

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-[#2a2a2a]/90 
                                hover:bg-white dark:hover:bg-[#2a2a2a] rounded-full shadow-lg 
                                transition-all duration-300 hover:scale-110"
                            >
                                <X size={20} className="text-gray-700 dark:text-gray-200" />
                            </button>
                        )}
                    </div>

                    <div className="pt-16 pb-8 px-8 max-h-[calc(90vh-180px)] overflow-y-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                {profile.nome}
                            </h1>

                            <p className="text-xl text-[#f83f32] font-semibold mt-2">
                                {profile.cargo}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-4 text-gray-600 dark:text-gray-300">
                                {profile.localizacao && (
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-[#f83f32]" />
                                        <span>{profile.localizacao}</span>
                                    </div>
                                )}
                                {profile.area && (
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={16} className="text-[#f83f32]" />
                                        <span>{profile.area}</span>
                                    </div>
                                )}
                            </div>

                            {profile.resumo && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 
                                border-l-4 border-[#f83f32] pl-4">
                                    {profile.resumo}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                {profile.habilidadesTecnicas?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                            <Award size={20} className="text-[#f83f32]" />
                                            Habilidades Técnicas
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {profile.habilidadesTecnicas.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-blue-50 dark:bg-blue-900/20 
                                                    text-blue-700 dark:text-blue-300 
                                                    px-3 py-1.5 rounded-full text-sm font-medium 
                                                    border border-blue-100 dark:border-blue-800/40"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {profile.softSkills?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                            <BookOpen size={20} className="text-[#f83f32]" />
                                            Soft Skills
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {profile.softSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-green-50 dark:bg-green-900/20 
                                                    text-green-700 dark:text-green-300 
                                                    px-3 py-1.5 rounded-full text-sm font-medium 
                                                    border border-green-100 dark:border-green-800/40"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {profile.idiomas?.length > 0 && (
                                    <LanguageCard languages={profile.idiomas} />
                                )}
                                {profile.certificacoes?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                            <Award size={20} className="text-[#f83f32]" />
                                            Certificações & Certificados
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
                                            {profile.certificacoes.map((cert, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-r from-[#f83f32] to-[#F97316] 
                                                    rounded-xl p-4 text-white shadow-lg hover:shadow-xl 
                                                    transition-all duration-300 transform hover:scale-105"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Award size={16} className="text-white" />
                                                        <span className="font-medium text-sm">{cert}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-6">
                                {profile.experiencias?.length > 0 && (
                                    <ExperienceCard experiences={profile.experiencias} />
                                )}

                                {profile.formacao?.length > 0 && (
                                    <TrainingCard trainings={profile.formacao} />
                                )}

                                {profile.projetos?.length > 0 && (
                                    <ProjectCard projects={profile.projetos} />
                                )}

                                {profile.areaInteresses?.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                            <Globe size={20} className="text-[#f83f32]" />
                                            Áreas de Interesse
                                        </h3>

                                        <div className="space-y-2">
                                            {profile.areaInteresses.map((area, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-[#f83f32] to-[#F97316] rounded-full"></div>
                                                    <span className="text-gray-700 dark:text-gray-300">{area}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleRecommend}
                                className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg 
                                hover:bg-[#FB923C] transition-all duration-300 shadow-md"
                            >
                                Recomendar Profissional
                            </button>

                            <button
                                onClick={handleMessage}
                                className="bg-[#f83f32] text-white font-semibold px-6 py-3 rounded-lg 
                                hover:bg-[#ff5d4a] transition-all duration-300 shadow-md"
                            >
                                Enviar Mensagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {showMessageModal && (
                <MessageModal 
                    profile={profile}
                    isOpen={true}
                    onClose={() => setShowMessageModal(false)}
                />
            )}
        </>
    )
}