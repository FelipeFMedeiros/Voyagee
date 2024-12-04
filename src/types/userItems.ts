export interface Destino {
    id: number;
    nome: string;
    estado: string;
    cidade: string;
    descricao?: string;
    latitude?: number;
    longitude?: number;
}

export interface Passeio {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    duracao_horas: number;
    nivel_dificuldade?: 'facil' | 'moderado' | 'dificil';
    inclui_refeicao: boolean;
    inclui_transporte: boolean;
    destino_id: number;
    capacidade_maxima: number;
}

export interface Roteiro {
    id: number;
    passeioId: number;
    data: string;
    horaInicio: string;
    horaFim: string;
    vagasDisponiveis: number;
    status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado';
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
    data: T[];
    pagination: PaginationData;
}
