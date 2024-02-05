'use client';


import styles from './theheader.module.css';
import { montserrat } from '@/app/layout';
import Link from 'next/link';
import SvgUser from '@/public/svgComponents/svgUser';
import SvgSearch from '@/public/svgComponents/svgSearch';
import SvgCart from '@/public/svgComponents/svgCart';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation'
import LoginForm from '@/components/LoginForm/LoginForm';
import { selectCartItems, selectViewItemCount, selectLogin } from '@/redux/selectors';
import { useAppSelector } from '@/redux/store';


export default function Theheader() {

    const pathname = usePathname();
    const cartItems = useAppSelector(selectCartItems);
    const cartItemsDetails = useAppSelector(selectViewItemCount);
    const login = useAppSelector(selectLogin);

    
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <h1 className={montserrat.className+' '+styles.logo}>Bookshop</h1>
                <ul className={montserrat.className+' '+styles.navLinks}>
                    <li className={styles.navLinksItems}><Link className={styles.navLinksDecorationItems+ ' ' +clsx(styles.navLinksItems, {[styles.navLinksItemBooks]: pathname === "/"})} href="/">books</Link></li>
                    <li className={styles.navLinksItems}><Link className={styles.navLinksDecorationItems+ ' ' +clsx(styles.navLinksItems, {[styles.navLinksItemBooks]: pathname === "/audiobooks"})} href="/audiobooks">audiobooks</Link></li>
                    <li className={styles.navLinksItems}><Link className={styles.navLinksDecorationItems+ ' ' +clsx(styles.navLinksItems, {[styles.navLinksItemBooks]: pathname === "/stationery"})} href="/stationery">Stationery & gifts</Link></li>
                    <li className={styles.navLinksItems}><Link className={styles.navLinksDecorationItems+ ' ' +clsx(styles.navLinksItems, {[styles.navLinksItemBooks]: pathname === "/blog"})} href="/blog">blog</Link></li>
                </ul>
                <div className={styles.navIinfo}>
                    <Link className={clsx({[styles.disabled]: pathname === "/profile"})} href={login ? "/profile" : "" } ><SvgUser /></Link>
                    <Link className={styles.navInfoSearch} href=""><SvgSearch /></Link>
                    <Link className={clsx({[styles.disabled]: pathname === "/cart"})} href="/cart"><SvgCart /></Link>
                    <div className={cartItems.length > 0 ? styles.navInfoCartFlag : styles.navInfoCartFlagWhite}>{cartItems.length > 0 && cartItems.length + cartItemsDetails.length}</div>
                    {login ? "" : <LoginForm />}
                </div>
            </nav>
        </header>
    )
}