import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispath, RootState } from '../../store/store';
import styles from './Cart.module.css';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 52;

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

    const jwt = useSelector((s: RootState) => s.user.jwt);
    const dispatch = useDispatch<AppDispath>();
    const navigate = useNavigate();

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    };

    const loadAllItems = async () => {
        const res = await Promise.all(items.map((i) => getItem(i.id)));
        setCartProducts(res);
    };

    useEffect(() => {
        loadAllItems();
    }, [items]);

    const total = items.reduce((acc, i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (product) {
            acc += i.count * product.price;
        }
        return acc;
    }, 0);

    const checkout = async () => {
        await axios.post(
            `${PREFIX}/order`,
            {
                products: items,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch(cartActions.clean());
        navigate('/success');
    };

    return (
        <>
            <Headling className={styles['headling']}>Корзина</Headling>

            {items.reduce<React.ReactNode[]>((acc, i) => {
                const product = cartProducts.find((p) => p.id === i.id);
                if (product) {
                    acc.push(
                        <CartItem
                            key={product.id}
                            count={i.count}
                            {...product}
                        />
                    );
                }
                return acc;
            }, [])}
            <div className={styles['line']}>
                <div className={styles['text']}>Итог</div>
                <div className={styles['price']}>
                    {total}&nbsp;<span>₽</span>
                </div>
            </div>
            <hr className={styles['hr']} />
            <div className={styles['line']}>
                <div className={styles['text']}>Доставка</div>
                <div className={styles['price']}>
                    {DELIVERY_FEE}&nbsp;<span>₽</span>
                </div>
            </div>
            <hr className={styles['hr']} />
            <div className={styles['line']}>
                <div className={styles['text']}>
                    Итог&nbsp;
                    <span className={styles['total-count']}>
                        ({items.length})
                    </span>
                </div>
                <div className={styles['price']}>
                    {total + DELIVERY_FEE}&nbsp;<span>₽</span>
                </div>
            </div>
            <div className={styles['checkout']}>
                <Button appearence="big" onClick={checkout}>
                    оформить
                </Button>
            </div>
        </>
    );
}
