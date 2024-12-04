import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userItemsService } from '../services/userItemsService';
import { Destino, Passeio, Roteiro } from '../types/userItems';
import { ItemCarousel } from '../components/ItemCarousel';
import { MapPin, Clock, Users } from 'lucide-react';

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

    const renderDestino = (destino: Destino) => (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-2">{destino.nome}</h3>
            <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{`${destino.cidade}, ${destino.estado}`}</span>
            </div>
            {destino.descricao && (
                <p className="text-gray-600 text-sm line-clamp-2">
                    {destino.descricao}
                </p>
            )}
        </div>
    );

    const renderPasseio = (passeio: Passeio) => (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-2">{passeio.nome}</h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <p className="line-clamp-2">{passeio.descricao}</p>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{passeio.duracao_horas}h</span>
                </div>
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Máx: {passeio.capacidade_maxima} pessoas</span>
                </div>
                <div className="text-lg font-semibold text-blue-600">
                    R$ {Number(passeio.preco).toFixed(2)}
                </div>
            </div>
        </div>
    );

    const renderRoteiro = (roteiro: Roteiro) => (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-2">
                {roteiro.passeio_nome || 'Roteiro'} -{' '}
                {new Date(roteiro.data).toLocaleDateString()}
            </h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>
                        {roteiro.hora_inicio} - {roteiro.hora_fim}
                    </span>
                </div>
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{roteiro.vagas_disponiveis} vagas disponíveis</span>
                </div>
                {roteiro.passeio_descricao && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {roteiro.passeio_descricao}
                    </p>
                )}
                <span
                    className={`
                        px-2 py-1 rounded-full text-xs font-medium
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
                    {roteiro.status.charAt(0).toUpperCase() +
                        roteiro.status.slice(1)}
                </span>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Meus Roteiros</h1>

            <div className="space-y-12">
                <ItemCarousel
                    title="Meus Destinos"
                    items={destinos}
                    renderItem={renderDestino}
                    loading={loading.destinos}
                    onCreateNew={() => {
                        /* Implementar modal de criação */
                    }}
                />

                <ItemCarousel
                    title="Meus Passeios"
                    items={passeios}
                    renderItem={renderPasseio}
                    loading={loading.passeios}
                    onCreateNew={() => {
                        /* Implementar modal de criação */
                    }}
                />

                <ItemCarousel
                    title="Roteiros Agendados"
                    items={roteiros}
                    renderItem={renderRoteiro}
                    loading={loading.roteiros}
                    onCreateNew={() => {
                        /* Implementar modal de criação */
                    }}
                />
            </div>
        </div>
    );
}
