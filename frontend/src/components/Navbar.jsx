import { Link, useLocation, useNavigate } from "react-router-dom"
import { getLoggedUser, logout } from "../services/Auth"
import { useEffect, useState } from "react"
import useTheme from "../hooks/useTheme";

import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const usuario = getLoggedUser();
    const location = useLocation();
    const navigate = useNavigate();

    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsMobileMenuOpen(false);
    };


    return (
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm px-6 py-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 relative z-40">
            <div className="flex justify-between items-center h-14">

                <Link
                    to="/"
                    className="font-logo text-[#f83f32] dark:text-[#fb634f] font-bold text-2xl tracking-wide hover:scale-105 transition-transform duration-300"
                >
                    TALENT HUB
                </Link>

                <NavbarDesktop
                    usuario={usuario}
                    isActive={isActive}
                    handleLogout={handleLogout}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />

                <div className="lg:hidden flex items-center space-x-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#fb634f] p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <NavbarMobile
                usuario={usuario}
                isActive={isActive}
                isOpen={isMobileMenuOpen}
                setIsOpen={setIsMobileMenuOpen}
                handleLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
            />

        </nav >
    );
}