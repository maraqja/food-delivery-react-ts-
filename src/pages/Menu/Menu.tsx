import { useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const getMenu = async () => {
        // try {
        //     const res = await fetch(`${PREFIX}/products`);
        //     if (!res.ok) {
        //         return;
        //     }
        //     const data = (await res.json()) as Product[];
        //     setProducts(data);
        // } catch (e) {
        //     console.error(e);
        //     return;
        // }
        try {
            setIsLoading(true);
            // await new Promise<void>((resolve) =>
            //     setTimeout(() => {
            //         resolve();
            //     }, 2000)
            // );
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            if (e instanceof AxiosError) {
                setError(e.message);
            }

            setIsLoading(false);
            return;
        }
    };

    useEffect(() => {
        getMenu();
    }, []);
    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search placeholder="Введите название" />
            </div>
            <div>
                {error && <>{error}</>}
                {!isLoading && <MenuList products={products} />}
                {isLoading && <>Загрузка...</>}
            </div>
        </>
    );
}

export default Menu;
