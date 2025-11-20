import { useState } from "react";

export function MessageModal({ isOpen, onClose, onSend, profile }) {
    const [message, setMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (message === "") {
            alert("Para enviar é necessário escrever alguma mensagem!");
            return;
        }
        console.log("Mensagem enviada:", message);
        alert(`Mensagem enviada para ${profile?.nome}!`);
        onSend?.(message);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Enviar Mensagem</h2>
                <p className="text-gray-700 mb-2 text-sm">Mensagem para <span className="font-semibold">{profile?.nome}</span>:</p>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 outline-none"
                    placeholder="Digite sua mensagem..."
                />

                <div className="flex justify-between gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Voltar
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 py-2 rounded-lg bg-[#F97316] text-white font-semibold hover:bg-[#FB923C] transition"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}