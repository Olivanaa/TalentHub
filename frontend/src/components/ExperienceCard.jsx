import { Briefcase } from "lucide-react";
import { FormatDate } from "../utils/FormatDate";

export default function ExperienceCard({ experiences }) {
    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-[#f83f32]" />
                Experiências Profissionais
            </h3>
            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <article key={index} className="bg-gray-50 rounded-xl p-4 border-l-4 border-[#f83f32]">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{exp.cargo}</h4>
                            <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
                                {FormatDate(exp.inicio)} - {FormatDate(exp.fim)}
                            </span>
                        </div>
                        <p className="text-[#f83f32] font-medium text-sm mb-2">{exp.empresa}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{exp.descricao}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}