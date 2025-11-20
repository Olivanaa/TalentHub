import { BookOpen } from "lucide-react";

export default function TrainingCard({ trainings }) {
    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#f83f32]" />
                Formação Acadêmica
            </h3>
            <div className="space-y-4">
                {trainings.map((training, index) => (
                    <article key={index} className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                        <h4 className="font-semibold text-gray-900">{training.curso}</h4>
                        <p className="text-gray-600 text-sm mt-1">{training.instituicao}</p>
                        <p className="text-gray-500 text-sm mt-1">{training.ano}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}