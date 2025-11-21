import { useState, useEffect } from "react"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"

export default function FilterComponent({
    onFilterChange,
    availableFilters
}) {

    const [isOpen, setIsOpen] = useState(false)
    const [filters, setFilters] = useState({
        area: "",
        cidade: "",
        tecnologia: ""
    })

    const handleFilterChange = (filterType, value) => {
        const newFilters = {
            ...filters,
            [filterType]: value
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const clearFilters = () => {
        const newFilters = {
            area: "",
            cidade: "",
            tecnologia: ""
        }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    const hasActiveFilters = filters.area || filters.cidade || filters.tecnologia


    return (
        <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg p-4 shadow-sm transition-colors mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-600 dark:text-gray-300" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Filtrar</span>
                    {hasActiveFilters && (
                        <span className="bg-[#f83f32] text-white text-xs px-2 py-1 rounded-full">
                            Ativos
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#ff5e50] transition-colors"
                        >
                            <X size={16} />
                            Limpar filtros
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#ff5e50] transition-colors"
                    >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {isOpen ? 'Ocultar' : 'Mostrar'} filtros
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 mt-4 border-t border-gray-200 dark:border-white/10">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Área de Atuação
                        </label>
                        <select
                            value={filters.area}
                            onChange={(e) => handleFilterChange('area', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f83f32] focus:border-transparent"
                        >
                            <option value="">Todas as áreas</option>
                            {availableFilters.areas.map(area => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Cidade
                        </label>
                        <select
                            value={filters.cidade}
                            onChange={(e) => handleFilterChange('cidade', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f83f32] focus:border-transparent"
                        >
                            <option value="">Todas as cidades</option>
                            {availableFilters.cidades.map(cidade => (
                                <option key={cidade} value={cidade}>{cidade}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tecnologia
                        </label>
                        <select
                            value={filters.tecnologia}
                            onChange={(e) => handleFilterChange('tecnologia', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f83f32] focus:border-transparent"
                        >
                            <option value="">Todas as tecnologias</option>
                            {availableFilters.habilidades.map(tech => (
                                <option key={tech} value={tech}>{tech}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    )

}