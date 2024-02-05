

import styles from './promoLinks.module.css';
import promo_2 from '@/public/images/promo_2.png';
import promo_1 from '@/public/images/promo_1.png';
import Link from 'next/link';
import Image from 'next/image';


export default function PromoLink() {
    return (
        <div className={styles.promo}>
            <Link className={styles.promoLink} href=""><div className={styles.promo1}><Image src={promo_1} alt='banner_1' width={149} height={204} /></div></Link>
            <Link className={styles.promoLink} href=""><div className={styles.promo2}><Image src={promo_2} alt='banner_1' width={137} height={237} /></div></Link>
        </div>
    )
}