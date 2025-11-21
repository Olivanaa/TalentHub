import { Sun, MoonStar } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme, label = false }) {
    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-[#f83f32] dark:hover:text-[#fb634f] transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            {theme === "dark" ? <Sun size={20} /> : <MoonStar size={20} />}
            {label && <span className="font-medium">Alternar Tema</span>}
        </button>
    )
}
