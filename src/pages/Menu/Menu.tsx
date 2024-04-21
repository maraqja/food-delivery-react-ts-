import Headling from '../../components/Headling/Headling';
import ProductCard from '../../components/ProductCard/ProductCard';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu() {
    return (
        <>
            <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search placeholder="Введите название" />
            </div>
            <div>
                <ProductCard
                    id={1}
                    title="Вкуснятина"
                    description="Салями, руккола, помидоры, оливки"
                    rating={4.7}
                    price={450}
                    image="/product-demo.png"
                />
            </div>
        </>
    );
}
