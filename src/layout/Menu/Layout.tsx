import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { useEffect } from 'react';
import cn from 'classnames';

export function Layout() {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div className={styles['user']}>
                    <img
                        className={styles['avatar']}
                        src="/avatar.png"
                        alt="Аватар пользователя"
                    />
                    <div className={styles['name']}>Kaka Kaka</div>
                    <div className={styles['email']}>kaka@kaka.com</div>
                </div>
                <div className={styles['menu']}>
                    <Link
                        to="/"
                        className={cn(styles['link'], {
                            [styles['active']]: location.pathname === '/',
                        })}
                    >
                        <img src="/menu-icon.svg" alt="Иконка меню" />
                        Menu
                    </Link>
                    <Link
                        to="/cart"
                        className={cn(styles['link'], {
                            [styles['active']]: location.pathname === '/cart',
                        })}
                    >
                        <img src="/cart-icon.svg" alt="Иконка корзины" />
                        Cart
                    </Link>
                </div>
                <Button className={styles['exit']}>
                    <img src="/exit-icon.svg" alt="Иконка выхода" />
                    Выход
                </Button>
            </div>

            <div>
                {/* Сюда подставляются все children-роуты для пути "/" - т.е. если зашли на /cart, то внутрь подставится компонент Cart*/}
                <Outlet />
            </div>
        </div>
    );
}
