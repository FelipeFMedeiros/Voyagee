// components/Roteiros/RoteiroCard.tsx
import { Clock, Users, MapPin, User } from 'lucide-react';
import { Roteiro } from '../../types/userItems'; // Corrigido o import

interface RoteiroCardProps {
  roteiro: Roteiro;
  passeio?: {
    preco: string;
    cidade: string;
    estado: string;
    criador_nome: string;
  };
}

export function RoteiroCard({ roteiro, passeio }: RoteiroCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Cabeçalho com nome do passeio e data */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {roteiro.passeio_nome}
          </h3>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              roteiro.status === 'agendado' 
                ? 'bg-yellow-100 text-yellow-800' 
                : roteiro.status === 'confirmado' 
                ? 'bg-green-100 text-green-800' 
                : roteiro.status === 'concluido' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {roteiro.status.charAt(0).toUpperCase() + roteiro.status.slice(1)}
          </span>
        </div>

        {/* Informações do passeio */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>
                {new Date(roteiro.data).toLocaleDateString()} • {roteiro.hora_inicio} - {roteiro.hora_fim}
              </span>
            </div>
            {passeio && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{passeio.cidade}, {passeio.estado}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{roteiro.vagas_disponiveis} vagas disponíveis</span>
            </div>
          </div>

          {/* Detalhes adicionais */}
          {roteiro.passeio_descricao && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {roteiro.passeio_descricao}
            </p>
          )}

          {/* Informações do guia e preço */}
          {passeio && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="flex items-center flex-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">{passeio.criador_nome}</p>
                    <p className="text-xs text-gray-500">Guia Turístico</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    R$ {Number(passeio.preco).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">por pessoa</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}