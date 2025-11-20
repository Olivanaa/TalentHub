import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function NavbarMobile({
    usuario,
    isActive,
    isOpen,
    setIsOpen,
    handleLogout,
    theme,
    toggleTheme
}) {
    return (
        <>
            <div className="lg:hidden flex items-center space-x-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#fb634f] p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg transition-colors duration-300">
                    <div className="py-4 space-y-4">

                        {usuario && (
                            <div className="px-4 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                                <Search size={20} className="text-gray-600 dark:text-gray-300" />
                                <SearchBar />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                    isActive("/")
                                        ? "bg-[#f83f32]/10 dark:bg-[#fb634f]/20 text-[#f83f32] dark:text-[#fb634f] border-r-4 border-[#f83f32] dark:border-[#fb634f]"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#f83f32] dark:hover:text-[#fb634f]"
                                }`}
                            >
                                Home
                            </Link>

                            {usuario && (
                                <Link
                                    to="/profiles"
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                        isActive("/profiles")
                                            ? "bg-[#f83f32]/10 dark:bg-[#fb634f]/20 text-[#f83f32] dark:text-[#fb634f] border-r-4 border-[#f83f32] dark:border-[#fb634f]"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#f83f32] dark:hover:text-[#fb634f]"
                                    }`}
                                >
                                    Perfis
                                </Link>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                            {usuario ? (
                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-[#f83f32] dark:bg-[#fb634f] text-white px-6 py-3 rounded-lg hover:bg-[#e6352a] dark:hover:bg-[#ff7c6a] transition-all duration-300 shadow-md"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full bg-[#f83f32] dark:bg-[#fb634f] text-center text-white px-6 py-3 rounded-lg hover:bg-[#e6352a] dark:hover:bg-[#ff7c6a] transition-all duration-300 shadow-md"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <ThemeToggle theme={theme} toggleTheme={toggleTheme} label />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
