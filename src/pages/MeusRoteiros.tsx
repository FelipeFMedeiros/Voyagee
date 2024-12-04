import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userItemsService } from '../services/userItemsService';
import { Destino, Passeio, Roteiro } from '../types/userItems';
import { ItemCarousel } from '../components/ItemCarousel';
import { MapPin, Clock, Users } from 'lucide-react';
import { CreateDestinoModal } from '../components/modals/CreateDestinoModal';
import { CreatePasseioModal } from '../components/modals/CreatePasseioModal';
import { CreateRoteiroModal } from '../components/modals/CreateRoteiroModal';

export default function MeusRoteiros() {
    const { user } = useAuth();
    const [destinos, setDestinos] = useState<Destino[]>([]);
    const [passeios, setPasseios] = useState<Passeio[]>([]);
    const [roteiros, setRoteiros] = useState<Roteiro[]>([]);
    const [loading, setLoading] = useState({
        destinos: true,
        passeios: true,
        roteiros: true,
    });

    // Estado para controlar a exibição dos modais
    const [modals, setModals] = useState({
        destino: false,
        passeio: false,
        roteiro: false,
    });

    useEffect(() => {
        if (user?.id) {
            fetchUserItems();
        }
    }, [user]);

    const fetchUserItems = async () => {
        try {
            const [destinosRes, passeiosRes, roteirosRes] = await Promise.all([
                userItemsService.getDestinos(user!.id),
                userItemsService.getPasseios(user!.id),
                userItemsService.getRoteiros(user!.id),
            ]);

            setDestinos(destinosRes.data || []);
            setPasseios(passeiosRes.data || []);
            setRoteiros(roteirosRes.data || []);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            // Em caso de erro, garantimos que os arrays estão vazios
            setDestinos([]);
            setPasseios([]);
            setRoteiros([]);
        } finally {
            setLoading({
                destinos: false,
                passeios: false,
                roteiros: false,
            });
        }
    };

    const handleCreateDestino = async (data: Omit<Destino, 'id'>) => {
        try {
            await userItemsService.createDestino(data);
            fetchUserItems(); // Recarrega os dados
        } catch (error) {
            console.error('Erro ao criar destino:', error);
            throw error;
        }
    };

    const handleCreatePasseio = async (data: Omit<Passeio, 'id'>) => {
        try {
            await userItemsService.createPasseio(data);
            fetchUserItems();
        } catch (error) {
            console.error('Erro ao criar passeio:', error);
            throw error;
        }
    };

    const handleCreateRoteiro = async (
        data: Omit<Roteiro, 'id' | 'status'>,
    ) => {
        try {
            await userItemsService.createRoteiro(data);
            fetchUserItems();
        } catch (error) {
            console.error('Erro ao criar roteiro:', error);
            throw error;
        }
    };

    const renderDestino = (destino: Destino) => (
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{destino.nome}</h3>
            <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="min-w-4 h-4 mr-2" />
                <span className="truncate">{`${destino.cidade}, ${destino.estado}`}</span>
            </div>
            {destino.descricao && (
                <p className="text-gray-600 text-sm line-clamp-2 flex-grow">
                    {destino.descricao}
                </p>
            )}
        </div>
    );

    const renderPasseio = (passeio: Passeio) => {
        const getDifficultyColor = (nivel: 'facil' | 'moderado' | 'dificil') => {
            switch (nivel) {
                case 'facil':
                    return 'bg-green-100 text-green-800';
                case 'moderado':
                    return 'bg-yellow-100 text-yellow-800';
                case 'dificil':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        };
    
        return (
            <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{passeio.nome}</h3>
                <div className="flex flex-col gap-3 text-gray-600 text-sm flex-grow">
                    {/* Descrição */}
                    <p className="line-clamp-2">{passeio.descricao}</p>
    
                    {/* Informações básicas */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <Clock className="min-w-4 h-4 mr-2" />
                            <span>{passeio.duracao_horas}h</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="min-w-4 h-4 mr-2" />
                            <span>Máx: {passeio.capacidade_maxima} pessoas</span>
                        </div>
                    </div>
    
                    {/* Inclusões e Nível de Dificuldade */}
                    <div className="flex flex-wrap gap-2">
                        {passeio.inclui_refeicao === 1 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 12H2v3h4l12 6v-4m0-13v4" />
                                    <path d="M6 15h4" />
                                    <path d="M2 9h4" />
                                </svg>
                                Refeição
                            </span>
                        )}
                        {passeio.inclui_transporte === 1 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="8" width="18" height="12" rx="2" />
                                    <path d="M6 21v-4" />
                                    <path d="M18 21v-4" />
                                    <path d="M3 14h18" />
                                </svg>
                                Transporte
                            </span>
                        )}
                        <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getDifficultyColor(passeio.nivel_dificuldade)}
                        `}>
                            {passeio.nivel_dificuldade === 'facil' && (
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade === 'moderado' && (
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 15h8" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade === 'dificil' && (
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8 9s1.5 2 4 2 4-2 4-2" />
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            )}
                            {passeio.nivel_dificuldade.charAt(0).toUpperCase() + passeio.nivel_dificuldade.slice(1)}
                        </span>
                    </div>
    
                    {/* Localização */}
                    <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{passeio.cidade}, {passeio.estado}</span>
                    </div>
    
                    {/* Preço */}
                    <div className="text-lg font-semibold text-blue-600 mt-auto">
                        R$ {Number(passeio.preco).toFixed(2)}
                    </div>
                </div>
            </div>
        );
    };

    const renderRoteiro = (roteiro: Roteiro) => (
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {roteiro.passeio_nome || 'Roteiro'} -{' '}
                {new Date(roteiro.data).toLocaleDateString()}
            </h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm flex-grow">
                <div className="flex items-center">
                    <Clock className="min-w-4 h-4 mr-2" />
                    <span className="truncate">
                        {roteiro.hora_inicio} - {roteiro.hora_fim}
                    </span>
                </div>
                <div className="flex items-center">
                    <Users className="min-w-4 h-4 mr-2" />
                    <span>{roteiro.vagas_disponiveis} vagas disponíveis</span>
                </div>
                {roteiro.passeio_descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {roteiro.passeio_descricao}
                    </p>
                )}
                <span
                    className={`
                        px-2 py-1 rounded-full text-xs font-medium mt-auto inline-block w-fit
                        ${
                            roteiro.status === 'agendado'
                                ? 'bg-yellow-100 text-yellow-800'
                                : roteiro.status === 'confirmado'
                                ? 'bg-green-100 text-green-800'
                                : roteiro.status === 'concluido'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                        }
                    `}>
                    {roteiro.status.charAt(0).toUpperCase() + roteiro.status.slice(1)}
                </span>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Meus Roteiros</h1>

            <div className="space-y-8 sm:space-y-12">
                <ItemCarousel
                    title="Meus Destinos"
                    items={destinos}
                    renderItem={renderDestino}
                    loading={loading.destinos}
                    onCreateNew={() => setModals(prev => ({ ...prev, destino: true }))}
                />

                <ItemCarousel
                    title="Meus Passeios"
                    items={passeios}
                    renderItem={renderPasseio}
                    loading={loading.passeios}
                    onCreateNew={() => setModals(prev => ({ ...prev, passeio: true }))}
                />

                <ItemCarousel
                    title="Roteiros Agendados"
                    items={roteiros}
                    renderItem={renderRoteiro}
                    loading={loading.roteiros}
                    onCreateNew={() => setModals(prev => ({ ...prev, roteiro: true }))}
                />
            </div>

            {/* Modais */}
            <CreateDestinoModal
                isOpen={modals.destino}
                onClose={() =>
                    setModals((prev) => ({ ...prev, destino: false }))
                }
                onSubmit={handleCreateDestino}
            />

            <CreatePasseioModal
                isOpen={modals.passeio}
                onClose={() =>
                    setModals((prev) => ({ ...prev, passeio: false }))
                }
                onSubmit={handleCreatePasseio}
                destinos={destinos}
            />

            <CreateRoteiroModal
                isOpen={modals.roteiro}
                onClose={() =>
                    setModals((prev) => ({ ...prev, roteiro: false }))
                }
                onSubmit={handleCreateRoteiro}
                passeios={passeios}
            />
        </div>
    );
}