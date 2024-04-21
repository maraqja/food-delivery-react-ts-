import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import { Route, Routes } from 'react-router-dom';
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
            <div>
                <a href="/">Menu</a>
                <a href="/cart">Cart</a>
            </div>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
