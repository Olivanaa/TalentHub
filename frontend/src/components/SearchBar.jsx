import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar({ onSearch }) {

    const navigate = useNavigate()

    const [isExpanded, setIsExpanded] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [search, setSearch] = useState('')

    function handleSearch(e) {
        const value = e.target.value
        setSearch(value)

        if (value.trim()) {
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`)
            setSearch('')
            setShowSuggestions(false)
            setIsExpanded(false)
            if (onSearch) onSearch()
        }
    }

    function handleSuggestionClick() {
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`)
            setSearch('')
            setShowSuggestions(false)
            setIsExpanded(false)
            if (onSearch) onSearch()
        }
    }

    function handleMobileSearch() {
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`)
            setSearch('')
            setShowSuggestions(false)
            setIsExpanded(false)
            if (onSearch) onSearch()
        }
    }


    return (
          <div className="relative">
            <div className="hidden lg:block">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        onFocus={() => search.trim() && setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className="pr-4 py-2 w-64 border-b border-gray-300 outline-none transition-all duration-300 focus:border-[#f83f32] dark:text-gray-100 dark:border-gray-600"
                    />
                </div>
                {showSuggestions && search.trim() && (
                    <div className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-[9999]">
                        <div
                            className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-gray-700 border-b border-gray-100"
                            onClick={handleSuggestionClick}
                        >
                            <Search size={16} className="text-[#f83f32]" />
                            <span>Buscar por: <strong>"{search}"</strong></span>
                        </div>
                        <div className="p-2 text-xs text-gray-500 text-center">
                            Pressione Enter para buscar
                        </div>
                    </div>
                )}
            </div>
            <div className="lg:hidden">
                {isExpanded ? (
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={search}
                            onChange={handleSearch}
                            onKeyDown={handleKeyDown}
                            onBlur={() => setTimeout(() => setIsExpanded(false), 300)}
                            autoFocus
                            className="pl-10 pr-20 py-2 w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f83f32]/20 focus:border-[#f83f32] dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 outline-none transition-all duration-300"
                        />
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        {search.trim() && (
                            <button
                                onClick={handleMobileSearch}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#f83f32] text-white px-3 py-1 rounded text-sm font-medium hover:bg-[#e6352a] transition-colors"
                            >
                                Buscar
                            </button>
                        )}
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                    </div>
                ) : (
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="p-2 text-gray-600 hover:text-[#f83f32] transition-colors"
                    >
                        <Search size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}
