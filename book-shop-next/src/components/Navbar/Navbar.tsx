import styles from "./Navbar.module.scss";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import LoginPopup from "@/components/LoginPopup/LoginPopup";


export default function Navbar() {
    const cart = useSelector((state: RootState) => state.profile.cart)

    return (
        <header>
            <nav className={styles.Navbar}>
                <div className={styles.Navbar__logo}>
                    <Link href="/"> Bookshop </Link>
                </div>
                <div className={styles.Navbar__links}>
                    <div>
                        <Link href="/"
                              className={styles.Navbar__links__link + " " + styles.Navbar__links__link__active}> Books </Link>
                    </div>
                    <div>
                        <a href="#" className={styles.Navbar__links__link}> Audiobooks </a>
                    </div>
                    <div>
                        <a href="#" className={styles.Navbar__links__link}> Stationery & gifts </a>
                    </div>
                    <div>
                        <a href="#" className={styles.Navbar__links__link}> Blog </a>
                    </div>
                </div>
                <div className={styles.Navbar__profile}>
                    <LoginPopup/>
                    <Link href={"#"} className={styles.profile__btn + " " + styles.profile__btn__search}></Link>
                    <Link href={"/cart"} className={styles.profile__btn + " " + styles.profile__btn__basket}>
                        {cart.length > 0 && <div className={styles.basket__items} id="basketItems">{cart.length}</div>}
                    </Link>
                </div>
            </nav>
        </header>
    )
}