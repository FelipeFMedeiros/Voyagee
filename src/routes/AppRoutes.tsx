import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './router';
import MainHeader from '../components/Header/MainHeader';
import Footer from '../components/Footer';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export function AppRoutes() {
    const renderRouteElement = (Element: React.ComponentType) => {
        const Component = () => {
            return (
                <Suspense fallback={<LoadingSpinner />}>
                    <Element />
                </Suspense>
            );
        };
        return <Component />;
    };

    const renderRoute = (route: { path: string; element: React.ComponentType; children?: { path: string; element: React.ComponentType }[] }) => {
        if (route.children) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={renderRouteElement(route.element)}
                >
                    {route.children.map((child) => (
                        <Route
                            key={`${route.path}/${child.path}`}
                            path={child.path}
                            element={renderRouteElement(child.element)}
                        />
                    ))}
                </Route>
            );
        }
        return (
            <Route
                key={route.path}
                path={route.path}
                element={renderRouteElement(route.element)}
            />
        );
    };

    return (
        <>
            <MainHeader />
            <Routes>{routes.map(renderRoute)}</Routes>
            <Footer />
        </>
    );
}