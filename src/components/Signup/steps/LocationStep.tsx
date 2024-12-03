// components/Signup/steps/LocationStep.tsx
import { FormData, FormErrors, UserType } from '../../../types/signup';
import InputMask from 'react-input-mask';
import { Mail, MapPin } from 'lucide-react';

interface LocationStepProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userType: UserType | null;
  errors: FormErrors;
}

const LocationStep = ({ formData, onChange, userType, errors }: LocationStepProps) => (
  <div className="space-y-4">
    <div>
      <label htmlFor="email" className="sr-only">Email</label>
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
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Email"
        />
      </div>
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>

    {userType === 'guide' && (
      <div className="space-y-4">
        <h4 className="font-medium">Endereço Profissional</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="sr-only">CEP</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <InputMask
                mask="99999-999"
                id="zipCode"
                name="zipCode"
                required
                value={formData.zipCode}
                onChange={onChange}
                className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="CEP"
              />
            </div>
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={onChange}
              placeholder="País"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onChange}
              placeholder="Estado"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="Cidade"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={onChange}
            placeholder="Endereço"
            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={onChange}
              placeholder="Número"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="complement"
              value={formData.complement}
              onChange={onChange}
              placeholder="Complemento (opcional)"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    )}
  </div>
);
export default LocationStep;
