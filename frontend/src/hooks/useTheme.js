import { useEffect, useState } from "react"

export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("theme") || "light"
        } catch {
            return "light"
        }
    })

    useEffect(() => {
        const html = document.documentElement

        if (theme === "dark") {
            html.classList.add("dark")
        } else {
            html.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"))
    }

    return { theme, toggleTheme }
}
