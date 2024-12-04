export interface Destino {
    id: number;
    nome: string;
    estado: string;
    cidade: string;
    descricao?: string;
    latitude?: string;
    longitude?: string;
}

export interface Passeio {
    id: number;
    nome: string;
    descricao: string;
    preco: string;
    duracao_horas: number;
    nivel_dificuldade: 'facil' | 'moderado' | 'dificil';
    inclui_refeicao: number;
    inclui_transporte: number;
    destino_id: number;
    capacidade_maxima: number;
}

export interface Roteiro {
    id: number;
    passeio_id: number;
    data: string;
    hora_inicio: string;
    hora_fim: string;
    status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
    vagas_disponiveis: number;
    passeio_nome?: string;
    passeio_descricao?: string;
}

export interface PaginationData {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    roteiros?: T[];
    passeios?: T[];
    destinos?: T[];
    pagination: PaginationData;
}
