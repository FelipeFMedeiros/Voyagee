import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateDestinoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}

export function CreateDestinoModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateDestinoModalProps) {
    const initialFormState = {
        nome: '',
        estado: '',
        cidade: '',
        descricao: '',
        latitude: '',
        longitude: ''
      };
    
      const [formData, setFormData] = useState(initialFormState);
      const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setFormData(initialFormState);
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
          await onSubmit(formData);
          resetForm();
          onClose();
        } catch (error) {
          console.error('Erro ao criar destino:', error);
        } finally {
          setLoading(false);
        }
      };
    
      const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClickOutside}>
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Criar Novo Destino</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Destino
                        </label>
                        <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    nome: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 p-2"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Estado
                            </label>
                            <input
                                type="text"
                                value={formData.estado}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        estado: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                                maxLength={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cidade
                            </label>
                            <input
                                type="text"
                                value={formData.cidade}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        cidade: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                        </label>
                        <textarea
                            value={formData.descricao}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    descricao: e.target.value,
                                }))
                            }
                            className="w-full rounded-lg border border-gray-300 p-2"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        latitude: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        longitude: e.target.value,
                                    }))
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            disabled={loading}>
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            disabled={loading}>
                            {loading ? 'Criando...' : 'Criar Destino'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
