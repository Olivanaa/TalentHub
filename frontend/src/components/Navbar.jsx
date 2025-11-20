import { Link, useLocation, useNavigate } from "react-router-dom"
import { getLoggedUser, logout } from "../services/Auth"
import { Search, MoonStar, X, Menu } from "lucide-react"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"

export default function Navbar() {

    const usuario = getLoggedUser()
    const location = useLocation()
    const navigate = useNavigate()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        logout()
        navigate("/")
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }


    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 border-b border-gray-200 relative z-40">
            <div className="flex justify-between items-center h-14">
                <Link to="/"
                    className="font-logo text-[#f83f32] font-bold text-2xl tracking-wide hover:scale-105 transition-transform duration-300">
                    TALENT HUB
                </Link>
                {usuario ? (
                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center gap-3 text-gray-700">
                            <Search size={20} className="opacity-70" />
                            <SearchBar />
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link
                                to="/"
                                className={` flex items-center gap-2 font-medium transition-all duration-300 ${isActive('/')
                                    ? 'text-[#f83f32] border-b-2 border-[#f83f32] pb-1 text-lg font-bold'
                                    : 'text-gray-600 hover:text-[#f83f32] hover:scale-105'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/profiles"
                                className={` flex items-center gap-2 font-medium transition-all duration-300 ${isActive('/profiles')
                                    ? 'text-[#f83f32] border-b-2 border-[#f83f32] pb-1 text-lg font-bold'
                                    : 'text-gray-600 hover:text-[#f83f32] hover:scale-105'
                                    }`}
                            >
                                Perfis
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="bg-[#f83f32] font-medium text-white px-6 py-2 rounded-lg hover:bg-[#FB923C] transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                Logout
                            </button>

                            <button className="text-gray-600 hover:text-[#f83f32] transition-colors duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-100">
                                <MoonStar size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link
                            to="/login"
                            className="font-medium bg-[#f83f32] px-6 py-2 rounded-lg text-white hover:bg-[#FB923C] transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Login
                        </Link>
                        <button className="text-gray-600 hover:text-[#f83f32] transition-colors duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-100">
                            <MoonStar size={20} />
                        </button>

                    </div>
                )}
                <div className="lg:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-600 hover:text-[#f83f32] transition-colors p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200/60 bg-white/95 backdrop-blur-lg">
                    <div className="py-4 space-y-4">
                        {usuario ? (
                            <>
                                <div className="px-4 pb-4 border-b border-gray-200/60">
                                    <SearchBar />
                                </div>
                                <div className="space-y-2">
                                    <Link
                                        to="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={` flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive('/')
                                            ? 'bg-[#f83f32]/10 text-[#f83f32] border-r-4 border-[#f83f32]'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-[#f83f32]'
                                            }`}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/profiles"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={` flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300  ${isActive('/profiles')
                                            ? 'bg-[#f83f32]/10 text-[#f83f32] border-r-4 border-[#f83f32]'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-[#f83f32]'
                                            }`}
                                    >
                                        Perfis
                                    </Link>
                                </div>
                                <div className="pt-4 border-t border-gray-200/60 space-y-3">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full bg-[#f83f32] font-medium text-white px-6 py-3 rounded-lg hover:bg-[#e6352a] transition-all duration-300 shadow-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block w-full bg-[#f83f32] text-center font-medium text-white px-6 py-3 rounded-lg hover:bg-[#e6352a] transition-all duration-300 shadow-md"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                        <div className="pt-4 border-t border-gray-200/60">
                            <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-[#f83f32] transition-colors duration-300 w-full rounded-lg hover:bg-gray-100">
                                <MoonStar size={20} />
                                <span className="font-medium">Alternar Tema</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}