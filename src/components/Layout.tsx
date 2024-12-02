import { Outlet } from 'react-router-dom';
import Header from './Header/MainHeader';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}