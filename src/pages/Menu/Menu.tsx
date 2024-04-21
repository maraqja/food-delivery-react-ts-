import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';

export function Menu() {
    return (
        <>
            <div className={styles['head']}>
                <Headling>KAKA</Headling>
                <Search placeholder="Введите название" />
            </div>
        </>
    );
}
