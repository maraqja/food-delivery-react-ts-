import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './components/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx')); // теперь компонент Menu будет подгружаться только когда нужно

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RequireAuth>
                <Layout />
            </RequireAuth>
        ),
        children: [
            {
                path: '/',
                // используем Suspence для того чтобы отображать на компонент загрузки во время загрузки компонента Menu
                element: (
                    <Suspense fallback={<>Загрузка...</>}>
                        <Menu />
                    </Suspense>
                ),
            },
            { path: '/cart', element: <Cart /> },
            {
                path: '/product/:id',
                element: <Product />,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise<void>((resolve, reject) => {
                            setTimeout(
                                () =>
                                    resolve(
                                        axios.get(
                                            `${PREFIX}/products/${params.id}`
                                        )
                                    ),
                                2000
                            );
                        }),
                    });
                    // const { data } = await axios.get(
                    //     `${PREFIX}/products/${params.id}`
                    // );
                    // return data;
                },
                errorElement: <>Ошибка</>, // если компонент не загрузился через loader (либо если в самом компоненте произойдет ошибка)
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
