import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';

function App() {
    const [counter, setCounter] = useState<number>(0);

    const addCounter = (e: MouseEvent) => {
        console.log(e);
    };
    return (
        <>
            <Button appearence="small" onClick={addCounter}>
                Small Кнопка
            </Button>
            <Button appearence="big" onClick={addCounter}>
                Big Кнопка
            </Button>
            <Input placeholder="Email" />

            <ul>
                <li>
                    <Link to="/">Menu</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </>
    );
}

export default App;
