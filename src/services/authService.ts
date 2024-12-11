import api from './api';
import { FormData } from '../types/signup';

interface BaseRegisterData {
    userType: 'viajante' | 'guia';
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password: string;
}

interface RegisterTouristData extends BaseRegisterData {
    userType: 'viajante';
}

interface RegisterGuideData extends BaseRegisterData {
    userType: 'guia';
    country: string;
    state: string;
    city: string;
    zipCode: string;
    streetAddress: string;
    number: string;
    complement?: string;
    bairro: string;
}

type RegisterData = RegisterTouristData | RegisterGuideData;

interface ApiResponse {
    success: boolean;
    message: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}

interface ViajanteRequestData {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    dtNascimento: null;
    password: string;
}

const formatViajanteData = (formData: FormData): ViajanteRequestData => {
    // Remova todos os caracteres especiais do CPF e telefone
    const cpfClean = formData.cpf.replace(/[^\d]/g, '');
    const phoneClean = formData.phone.replace(/[^\d]/g, '');

    return {
        nome: formData.name,
        cpf: cpfClean,
        email: formData.email,
        telefone: phoneClean,
        dtNascimento: null,
        password: formData.password
    };
};

const formatRegistrationData = (formData: FormData): RegisterData => {
    const baseData = {
        userType: formData.userType === 'guide' ? 'guia' : 'viajante',
        name: formData.name.trim(),
        email: formData.email.trim(),
        cpf: formData.cpf.replace(/[.-]/g, ''),
        phone: formData.phone.replace(/\D/g, ''),
        password: formData.password,
    };

    if (formData.userType === 'guide') {
        return {
            ...baseData,
            userType: 'guia',
            country: formData.country.trim(),
            state: formData.state.trim(),
            city: formData.city.trim(),
            zipCode: formData.zipCode.replace(/\D/g, ''),
            streetAddress: formData.streetAddress.trim(),
            number: formData.number.trim(),
            complement: formData.complement?.trim() || '',
            bairro: formData.bairro?.trim() || '',
        };
    }

    return {
        ...baseData,
        userType: 'viajante',
    };
};

export const register = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const data = formatRegistrationData(formData);
        const response = await api.post<ApiResponse>('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error('Erro no registro:', error);
        const apiError = error as ApiError;
        if (apiError.response?.data?.message) {
            throw new Error(apiError.response.data.message);
        }
        throw new Error('Erro ao realizar cadastro. Tente novamente.');
    }
};

export const registerViajante = async (formData: FormData): Promise<ApiResponse> => {
    try {
        const data = formatViajanteData(formData);
        
        // Log para debug
        console.log('Dados enviados para API:', data);

        const response = await api.post<ApiResponse>('/pessoa', data);
        return response.data;
    } catch (error) {
        console.error('Erro no registro de viajante:', error);
        const apiError = error as ApiError;
        
        // Log detalhado do erro
        console.log('Detalhes do erro:', {
            message: apiError.message,
            response: apiError.response,
            fullError: error
        });

        if (apiError.response?.data?.message) {
            throw new Error(apiError.response.data.message);
        }
        throw new Error('Erro ao realizar cadastro de viajante. Tente novamente.');
    }
};