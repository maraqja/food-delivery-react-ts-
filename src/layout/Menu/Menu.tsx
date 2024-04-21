import { Link, Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <Link to="/">Menu</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </div>

            <div>
                {/* Сюда подставляются все children-роуты для пути "/" - т.е. если зашли на /cart, то внутрь подставится компонент Cart*/}
                <Outlet />
            </div>
        </>
    );
}
