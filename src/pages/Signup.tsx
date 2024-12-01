// components/signup/SignUp.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { FormData, UserType, FormErrors } from '../types/signup';
import { UserTypeStep } from '../components/Signup/UserTypeStep';
import { PersonalInfoStep } from '../components/Signup/PersonalInfoStep';
import { LocationStep } from '../components/Signup/LocationStep';
import { maskCPF, validateCPF } from '../utils/masks';

const SignUp = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
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
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const totalSteps = formData.userType === 'guide' ? 5 : 4;

    const validateStep = (currentStep: number): boolean => {
      const errors: FormErrors = {};
      let isValid = true;
  
      switch (currentStep) {
          case 1:
              if (formData.userType === null) {
                  errors.userType = "Por favor, selecione um tipo de usuário";
                  isValid = false;
              }
              break;
          case 2:
              if (!formData.name.trim()) {
                  errors.name = "Nome é obrigatório";
                  isValid = false;
              }
              if (!validateCPF(formData.cpf)) {
                  errors.cpf = "CPF inválido";
                  isValid = false;
              }
              if (formData.phone.length < 10) {
                  errors.phone = "Telefone inválido";
                  isValid = false;
              }
              break;
          case 3:
              if (!formData.email.includes('@')) {
                  errors.email = "Email inválido";
                  isValid = false;
              }
              if (formData.userType === 'guide') {
                  if (!formData.country) {
                      errors.country = "País é obrigatório";
                      isValid = false;
                  }
                  if (!formData.state) {
                      errors.state = "Estado é obrigatório";
                      isValid = false;
                  }
                  if (!formData.city) {
                      errors.city = "Cidade é obrigatória";
                      isValid = false;
                  }
                  if (!formData.zipCode) {
                      errors.zipCode = "CEP é obrigatório";
                      isValid = false;
                  }
                  if (!formData.streetAddress) {
                      errors.streetAddress = "Endereço é obrigatório";
                      isValid = false;
                  }
                  if (!formData.number) {
                      errors.number = "Número é obrigatório";
                      isValid = false;
                  }
              }
              break;
      }
  
      setFormErrors(errors);
      return isValid;
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (name === 'cpf' && 'type' in e.target && e.target.type === 'text') {
            const maskedValue = maskCPF(value);
            setFormData((prev) => ({ ...prev, [name]: maskedValue }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                documents: Array.from(e.target.files || []),
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

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Signup:', formData);
      // Aqui você implementaria a lógica de envio do formulário
  };

  const renderProgressBar = () => (
      <div className="w-full mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
              <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
              />
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
              Etapa {step} de {totalSteps}
          </div>
      </div>
  );

  const renderDocumentsStep = () => (
      <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4">Documentação</h3>
          <p className="text-sm text-gray-600 mb-4">
              Por favor, envie documentos que comprovem sua atuação como guia turístico
              (certificados, registros profissionais, etc.)
          </p>
          <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
      </div>
  );

  const renderPasswordStep = () => (
      <div className="space-y-4">
          <div>
              <label htmlFor="password" className="sr-only">
                  Senha
              </label>
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
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Crie uma senha"
                  />
              </div>
          </div>
          <div>
              <label htmlFor="confirmPassword" className="sr-only">
                  Confirmar Senha
              </label>
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
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirme sua senha"
                  />
              </div>
          </div>
          <div className="flex items-center">
              <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  checked={formData.terms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  Eu concordo com os{' '}
                  <Link to="#" className="font-medium text-blue-500 hover:text-blue-600">
                      termos de uso
                  </Link>{' '}
                  e{' '}
                  <Link to="#" className="font-medium text-blue-500 hover:text-blue-600">
                      política de privacidade
                  </Link>
              </label>
          </div>
      </div>
  );

  const renderStep = () => {
      switch (step) {
          case 1:
              return <UserTypeStep onSelect={handleUserTypeSelect} errors={formErrors} />;
          case 2:
              return (
                  <PersonalInfoStep
                      formData={formData}
                      onChange={handleChange}
                      onPhoneChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
                      errors={formErrors}
                  />
              );
          case 3:
              return (
                  <LocationStep
                      formData={formData}
                      onChange={handleChange}
                      userType={formData.userType}
                      errors={formErrors}
                  />
              );
          case 4:
              return formData.userType === 'guide' ? renderDocumentsStep() : renderPasswordStep();
          case 5:
              return renderPasswordStep();
          default:
              return null;
      }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
              <div>
                  <h2 className="text-center text-3xl font-extrabold text-gray-900">
                      Criar nova conta
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                      Já tem uma conta?{' '}
                      <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600">
                          Fazer login
                      </Link>
                  </p>
              </div>

              {renderProgressBar()}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  {renderStep()}

                  <div className="flex justify-between space-x-4">
                      {step > 1 && (
                          <button
                              type="button"
                              onClick={handleBack}
                              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Voltar
                          </button>
                      )}
                      {step < totalSteps ? (
                          <button
                              type="button"
                              onClick={handleNext}
                              className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Próximo
                              <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                      ) : (
                          <button
                              type="submit"
                              className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Criar conta
                              <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                      )}
                  </div>
              </form>
          </div>
      </div>
  );
};

export default SignUp;