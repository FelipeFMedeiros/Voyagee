// components/signup/PersonalInfoStep.tsx
import { User, FileText } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import { FormData, FormErrors } from '../../types/signup';

interface PersonalInfoStepProps {
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPhoneChange: (phone: string) => void;
    errors?: FormErrors;
}

export const PersonalInfoStep = ({
    formData,
    onChange,
    onPhoneChange,
    errors = {},
}: PersonalInfoStepProps) => (
    <div className="space-y-4">
        <div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={onChange}
                    className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Nome completo"
                />
            </div>
            {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
        </div>

        <div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    required
                    value={formData.cpf}
                    onChange={onChange}
                    className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                        errors.cpf ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="CPF"
                />
            </div>
            {errors.cpf && (
                <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>
            )}
        </div>

        <div>
            <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700">
                Telefone
            </label>
            <PhoneInput
                country={'br'}
                value={formData.phone}
                onChange={onPhoneChange}
                containerClass="mt-1"
                inputClass={`w-full px-3 py-3 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                specialLabel=""
            />
            {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
        </div>
    </div>
);
