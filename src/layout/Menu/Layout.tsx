import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
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
                    <Link to="/" className={styles['link']}>
                        <img src="/menu-icon.svg" alt="Иконка меню" />
                        Menu
                    </Link>
                    <Link to="/cart" className={styles['link']}>
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
