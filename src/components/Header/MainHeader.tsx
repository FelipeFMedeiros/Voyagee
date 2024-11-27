import { Link } from 'react-router-dom';
import { PersonOutline, Menu } from '@mui/icons-material';

const MainHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors">
            Voyagee
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/roteiros" 
              className="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            >
              Roteiros
            </Link>
            <Link 
              to="/contato" 
              className="text-gray-600 hover:text-blue-500 transition-colors font-medium"
            >
              Contato
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
            >
              <PersonOutline />
              Fazer login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
            >
              Criar conta
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-500 hover:text-gray-700">
            <Menu sx={{ fontSize: 28 }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Hidden by default */}
      <div className="md:hidden hidden">
        <nav className="px-6 py-4 space-y-4 bg-white border-t">
          <Link 
            to="/" 
            className="block text-gray-600 hover:text-blue-500 transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/roteiros" 
            className="block text-gray-600 hover:text-blue-500 transition-colors font-medium"
          >
            Roteiros
          </Link>
          <Link 
            to="/contato" 
            className="block text-gray-600 hover:text-blue-500 transition-colors font-medium"
          >
            Contato
          </Link>
          <div className="pt-4 space-y-3">
            <Link 
              to="/login" 
              className="block w-full px-4 py-2 text-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              Fazer login
            </Link>
            <Link 
              to="/signup" 
              className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Criar conta
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;