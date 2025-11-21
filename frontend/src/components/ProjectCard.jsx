import { Award } from "lucide-react";

export default function ProjectCard({ projects }) {
    return (
        <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Award size={20} className="text-[#f83f32]" />
                Projetos
            </h3>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <article
                        key={index}
                        className="
                            bg-gray-50 dark:bg-gray-800 
                            rounded-xl p-4 
                            border border-gray-200 dark:border-gray-700
                        "
                    >
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {project.titulo}
                        </h4>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    text-[#f83f32] 
                                    text-sm 
                                    hover:underline 
                                    mb-2 
                                    inline-block
                                "
                            >
                                🔗 Ver projeto
                            </a>
                        )}

                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {project.descricao}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    )
}
