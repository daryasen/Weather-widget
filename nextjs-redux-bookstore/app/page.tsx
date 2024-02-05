
import styles from './page.module.css';
import Slider from '@/components/Slider/Slider';
import FilterBooksCategory from '@/components/FilterBooksCategory/FilterBooksCategory';
import PromoLink from '@/components/PromoLinks/PromoLinks';


export default function HomePage() {

    return (
        <div className={styles.main}>
            <Slider />
            <PromoLink />
            <FilterBooksCategory />
        </div>
    )
}