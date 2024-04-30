import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { Product } from './components/Product/Product.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';

const Menu = lazy(() => import('./pages/Menu/Menu.tsx')); // теперь компонент Menu будет подгружаться только когда нужно

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
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
                    const { data } = await axios.get(
                        `${PREFIX}/products/${params.id}`
                    );
                    return data;
                },
                errorElement: <>Ошибка</>, // если компонент не загрузился через loader (либо если в самом компоненте произойдет ошибка)
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
        <RouterProvider router={router} />
        {/* <App /> */}
    </React.StrictMode>
);
