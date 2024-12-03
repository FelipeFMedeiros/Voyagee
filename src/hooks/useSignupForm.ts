import { useState } from 'react';
import { FormData, FormErrors, UserType } from '../types/signup';
import { validateCPF, maskCPF } from '../utils/masks';

const initialFormData: FormData = {
    userType: null,
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    documents: [],
    terms: false,
    country: '',
    state: '',
    city: '',
    zipCode: '',
    streetAddress: '',
    number: '',
    complement: '',
};

export const useSignupForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const totalSteps = formData.userType === 'guide' ? 5 : 4;

    const validateStep = (currentStep: number): boolean => {
        const errors: FormErrors = {};
        let isValid = true;

        switch (currentStep) {
            case 1:
                if (formData.userType === null) {
                    errors.userType = 'Por favor, selecione um tipo de usuário';
                    isValid = false;
                }
                break;
            case 2:
                if (!formData.name.trim()) {
                    errors.name = 'Nome é obrigatório';
                    isValid = false;
                }
                if (!validateCPF(formData.cpf)) {
                    errors.cpf = 'CPF inválido';
                    isValid = false;
                }
                if (formData.phone.length < 10) {
                    errors.phone = 'Telefone inválido';
                    isValid = false;
                }
                break;
            case 3:
                if (!formData.email.includes('@')) {
                    errors.email = 'Email inválido';
                    isValid = false;
                }
                if (formData.userType === 'guide') {
                    if (!formData.country) {
                        errors.country = 'País é obrigatório';
                        isValid = false;
                    }
                    if (!formData.state) {
                        errors.state = 'Estado é obrigatório';
                        isValid = false;
                    }
                    if (!formData.city) {
                        errors.city = 'Cidade é obrigatória';
                        isValid = false;
                    }
                    if (!formData.zipCode) {
                        errors.zipCode = 'CEP é obrigatório';
                        isValid = false;
                    }
                    if (!formData.streetAddress) {
                        errors.streetAddress = 'Endereço é obrigatório';
                        isValid = false;
                    }
                    if (!formData.number) {
                        errors.number = 'Número é obrigatório';
                        isValid = false;
                    }
                }
                break;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;
        if (name === 'cpf' && 'type' in e.target && e.target.type === 'text') {
            const maskedValue = maskCPF(value);
            setFormData((prev) => ({ ...prev, [name]: maskedValue }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]:
                    type === 'checkbox'
                        ? (e.target as HTMLInputElement).checked
                        : value,
            }));
        }
    };

    const handleUserTypeSelect = (type: UserType) => {
        setFormData((prev) => ({ ...prev, userType: type }));
        setStep(2);
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep((prev) => prev + 1);
            setFormErrors({});
        }
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    return {
        step,
        totalSteps,
        formData,
        formErrors,
        handleChange,
        handleUserTypeSelect,
        handleNext,
        handleBack,
        validateStep,
        setFormData,
    };
};
