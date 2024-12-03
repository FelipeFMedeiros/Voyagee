import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StepProgress from '../components/Signup/StepProgress';
import UserTypeStep from '../components/Signup/steps/UserTypeStep';
import PersonalInfoStep from '../components/Signup/steps/PersonalInfoStep';
import LocationStep from '../components/Signup/steps/LocationStep';
import DocumentsStep from '../components/Signup/steps/DocumentsStep';
import PasswordStep from '../components/Signup/steps/PasswordStep';
import { useSignupForm } from '../hooks/useSignupForm';

const SignUp = () => {
  const {
    step,
    totalSteps,
    formData,
    formErrors,
    handleChange,
    handleUserTypeSelect,
    handleNext,
    handleBack,
    setFormData,
  } = useSignupForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup:', formData);
    // Implementação do envio do formulário virá aqui
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeStep onSelect={handleUserTypeSelect} errors={formErrors} />;
      case 2:
        return (
          <PersonalInfoStep
            formData={formData}
            onChange={handleChange}
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
        return formData.userType === 'guide' ? (
          <DocumentsStep
            onChange={(e) => setFormData(prev => ({
              ...prev,
              documents: Array.from(e.target.files || []),
            }))}
          />
        ) : (
          <PasswordStep
            formData={formData}
            onChange={handleChange}
            errors={formErrors}
          />
        );
      case 5:
        return (
          <PasswordStep
            formData={formData}
            onChange={handleChange}
            errors={formErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Header */}
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

        <StepProgress currentStep={step} totalSteps={totalSteps} />

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between space-x-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Voltar
              </button>
            )}
            <button
              type={step === totalSteps ? 'submit' : 'button'}
              onClick={step < totalSteps ? handleNext : undefined}
              className="flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600"
            >
              {step === totalSteps ? 'Criar conta' : 'Próximo'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;