import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';

import cn from 'classnames';

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
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        {/* NavLink автоматически присваивает класс active активному элементу (но с учетом того, что используем css модули, то у нас каждый класс будет с цифрами - поэтому используем isActive в classnames) */}
                        <img src="/menu-icon.svg" alt="Иконка меню" />
                        Menu
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(styles['link'], {
                                [styles.active]: isActive,
                            })
                        }
                    >
                        <img src="/cart-icon.svg" alt="Иконка корзины" />
                        Cart
                    </NavLink>
                </div>
                <Button className={styles['exit']}>
                    <img src="/exit-icon.svg" alt="Иконка выхода" />
                    Выход
                </Button>
            </div>

            <div className={styles['content']}>
                {/* Сюда подставляются все children-роуты для пути "/" - т.е. если зашли на /cart, то внутрь подставится компонент Cart*/}
                <Outlet />
            </div>
        </div>
    );
}
