import { lazy } from 'react';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Lazy loading para páginas que não são iniciais
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
/*const Roteiros = lazy(() => import('../pages/Roteiros'));
const Contato = lazy(() => import('../pages/Contato'));*/

export const routes = [
    {
        path: '/',
        element: Home,
        label: 'Home',
        showInNav: true,
        order: 1,
    },
    /*{
        path: '/roteiros',
        element: Roteiros,
        label: 'Roteiros',
        showInNav: true,
        order: 2,
    },
    {
        path: '/contato',
        element: Contato,
        label: 'Contato',
        showInNav: true,
        order: 3,
    },*/
    {
        path: '/login',
        element: Login,
        showInNav: false
    },
    {
        path: '/signup',
        element: Signup,
        showInNav: false
    },
    {
        path: '*',
        element: NotFound,
        showInNav: false
    }
];