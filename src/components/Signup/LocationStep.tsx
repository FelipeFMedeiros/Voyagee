// components/signup/LocationStep.tsx
import { Mail } from 'lucide-react';
import { Country, State, City } from 'country-state-city';
import { FormData, UserType, FormErrors } from '../../types/signup';
import { useEffect, useState } from 'react';

// Definindo tipos para os dados de localização
interface ICountry {
    isoCode: string;
    name: string;
}

interface IState {
    isoCode: string;
    name: string;
}

interface ICity {
    name: string;
}

interface LocationStepProps {
    formData: FormData;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => void;
    userType: UserType;
    errors?: FormErrors;
}

export const LocationStep = ({
    formData,
    onChange,
    userType,
    errors = {},
}: LocationStepProps) => {
    const [countries] = useState<ICountry[]>(Country.getAllCountries());
    const [states, setStates] = useState<IState[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() => {
        if (formData.country) {
            setStates(State.getStatesOfCountry(formData.country));
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.country && formData.state) {
            setCities(City.getCitiesOfState(formData.country, formData.state));
        }
    }, [formData.country, formData.state]);

    return (
        <div className="space-y-4">
            <div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={onChange}
                        className={`appearance-none block w-full px-3 py-3 pl-10 border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Email"
                    />
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {userType === 'guide' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            País
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={onChange}
                            className={`mt-1 block w-full py-2 px-3 border ${
                                errors.country
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-lg`}>
                            <option value="">Selecione um país</option>
                            {countries.map((country) => (
                                <option
                                    key={country.isoCode}
                                    value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.country && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.country}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estado
                        </label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={onChange}
                            className={`mt-1 block w-full py-2 px-3 border ${
                                errors.state
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-lg`}
                            disabled={!formData.country}>
                            <option value="">Selecione um estado</option>
                            {states.map((state) => (
                                <option
                                    key={state.isoCode}
                                    value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.state}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cidade
                        </label>
                        <select
                            name="city"
                            value={formData.city}
                            onChange={onChange}
                            className={`mt-1 block w-full py-2 px-3 border ${
                                errors.city
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            } rounded-lg`}
                            disabled={!formData.state}>
                            <option value="">Selecione uma cidade</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors.city && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.city}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                CEP
                            </label>
                            <input
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={onChange}
                                className={`mt-1 block w-full py-2 px-3 border ${
                                    errors.zipCode
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.zipCode && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.zipCode}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Endereço
                            </label>
                            <input
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={onChange}
                                className={`mt-1 block w-full py-2 px-3 border ${
                                    errors.streetAddress
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {errors.streetAddress && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.streetAddress}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Número
                                </label>
                                <input
                                    name="number"
                                    value={formData.number}
                                    onChange={onChange}
                                    className={`mt-1 block w-full py-2 px-3 border ${
                                        errors.number
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.number && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.number}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Complemento
                                </label>
                                <input
                                    name="complement"
                                    value={formData.complement}
                                    onChange={onChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
