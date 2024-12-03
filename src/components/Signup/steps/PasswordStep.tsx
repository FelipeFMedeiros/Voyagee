// components/Signup/steps/PasswordStep.tsx
import { FormData, FormErrors } from '../../../types/signup';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PasswordStepProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: FormErrors;
}

export const PasswordStep = ({ formData, onChange, errors }: PasswordStepProps) => (
  <div className="space-y-4">
    <div>
      <label htmlFor="password" className="sr-only">Senha</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Crie uma senha"
        />
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
      )}
    </div>

    <div>
      <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={onChange}
          className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirme sua senha"
        />
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
      )}
    </div>

    <div className="flex items-center">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        checked={formData.terms}
        onChange={onChange}
        className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
        Eu concordo com os{' '}
        <Link to="/termos" className="font-medium text-blue-500 hover:text-blue-600">
          termos de uso
        </Link>{' '}
        e{' '}
        <Link to="/privacidade" className="font-medium text-blue-500 hover:text-blue-600">
          política de privacidade
        </Link>
      </label>
    </div>
    {errors.terms && (
      <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
    )}

    <div className="mt-1 text-sm text-gray-600">
      <p>Sua senha deve conter:</p>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>Pelo menos 8 caracteres</li>
        <li>Pelo menos uma letra maiúscula</li>
        <li>Pelo menos uma letra minúscula</li>
        <li>Pelo menos um número</li>
        <li>Pelo menos um caractere especial</li>
      </ul>
    </div>
  </div>
);

export default PasswordStep;