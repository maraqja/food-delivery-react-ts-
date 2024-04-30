import { Await, useLoaderData } from 'react-router-dom';
import type { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';

export function Product() {
    const data = useLoaderData() as { data: Product };

    return (
        <>
            <Suspense fallback={'Загрузка...'}>
                {/* ждем пока появится data.data и только тогда отображаем */}
                <Await
                    // errorElement указан в main.tsx уже (но можно указывать его тут)
                    // errorElement = {<>Ошибка</>}
                    resolve={data.data}
                >
                    {({ data }: { data: Product }) => (
                        <>Product - {data.name}</>
                    )}
                </Await>
            </Suspense>
        </>
    );
}
