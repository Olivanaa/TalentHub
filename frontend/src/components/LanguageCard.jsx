import { Globe } from "lucide-react";

export default function LanguageCard({ languages }) {
    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-[#f83f32]" />
                Idiomas
            </h3>
            <div className="space-y-3">
                {languages.map((lang, index) => (
                    <article key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <span className="font-medium text-gray-900">{lang.idioma}</span>
                        <span className="text-sm text-[#f83f32] bg-orange-50 px-3 py-1 rounded-full">
                            {lang.nivel}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    )
}