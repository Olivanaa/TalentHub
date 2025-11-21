import { useState, useEffect } from "react"

export function useFilters() {
    const [filteredCitys, setFilteredCitys] = useState([])
    const [filteredAreas, setFilteredAreas] = useState([])
    const [filteredHardSkills, setFilteredHardSkills] = useState([])

    const API_URL = import.meta.env.VITE_API_URL

    async function fetchFilters() {
        try {
            const res = await fetch(`${API_URL}/profissionais`)
            const data = await res.json()

            const areasMap = data.map(p => p.area).filter(Boolean)
            const setAreas = new Set(areasMap)
            const areas = [...setAreas].sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase())
            )

            const habilidadesMap = data.flatMap(p => p.habilidadesTecnicas || []).filter(Boolean)
            const setHabilidades = new Set(habilidadesMap)
            const habilidades = [...setHabilidades].sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase())
            )

            const cidadesMap = data.map(p => p.localizacao ? p.localizacao.slice(0, -3) : null).filter(Boolean)
            const setCidades = new Set(cidadesMap)
            const cidades = [...setCidades].sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase())
            )

            setFilteredAreas(areas)
            setFilteredHardSkills(habilidades)
            setFilteredCitys(cidades)

        } catch (err) {
            console.error("Erro ao buscar dados:", err)
        }
    }

    useEffect(() => {
        fetchFilters()
    }, [])

    return {
        areas: filteredAreas,
        cidades: filteredCitys,
        habilidades: filteredHardSkills
    }
}