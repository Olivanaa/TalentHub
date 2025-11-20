import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function NavbarDesktop({
    usuario,
    isActive,
    handleLogout,
    theme,
    toggleTheme
}) {
    return (
        <div className="hidden lg:flex items-center space-x-8">

            {usuario && (
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Search size={20} className="opacity-70" />
                    <SearchBar />
                </div>
            )}

            <div className="flex items-center space-x-6">
                <Link
                    to="/"
                    className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                        isActive("/")
                            ? "text-[#f83f32] dark:text-[#fb634f] border-b-2 border-[#f83f32] dark:border-[#fb634f] pb-1 text-lg font-bold"
                            : "text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#fb634f] hover:scale-105"
                    }`}
                >
                    Home
                </Link>

                {usuario && (
                    <Link
                        to="/profiles"
                        className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                            isActive("/profiles")
                                ? "text-[#f83f32] dark:text-[#fb634f] border-b-2 border-[#f83f32] dark:border-[#fb634f] pb-1 text-lg font-bold"
                                : "text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#fb634f] hover:scale-105"
                        }`}
                    >
                        Perfis
                    </Link>
                )}
            </div>

            <div className="flex items-center space-x-4">
                {usuario ? (
                    <button
                        onClick={handleLogout}
                        className="bg-[#f83f32] dark:bg-[#fb634f] font-medium text-white px-6 py-2 rounded-lg hover:bg-[#FB923C] dark:hover:bg-[#ff846d] transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="font-medium bg-[#f83f32] dark:bg-[#fb634f] px-6 py-2 rounded-lg text-white hover:bg-[#FB923C] dark:hover:bg-[#ff846d] transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        Login
                    </Link>
                )}

                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

        </div>
    );
}
