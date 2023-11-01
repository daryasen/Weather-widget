import styles from "./Cart.module.scss";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {changeQuantity, ICartItem, IProfileState} from "@/store/profile";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {RootState} from "@/store";
import CartItem from "@/components/CartItem/CartItem";
import {AnimatePresence, motion} from "framer-motion";
import {getTotalPrice} from "@/data/utils";


export default function Cart() {
    const token = useSelector((state: RootState) => state.profile.token);
    const items = useSelector((state: RootState) => state.profile.cart);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleQuantityChange = (item: ICartItem, value: number) => {
        console.log(item);
        console.log(value);
        dispatch(changeQuantity({book: item.book, quantity: value}));
    }

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, []);

    return (
        <>
            <Head>
                <title>Cart</title>
                <meta name="description" content="Shopping cart"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section className={styles.cart}>
                <div>
                    <h1 className={styles.cart__bigText}>SHOPPING CART</h1>
                </div>
                {items.length === 0 && <div className={styles.center}>
                    <h3 className={styles.empty}>Cart is empty</h3></div>}
                <AnimatePresence>
                    {items.length !== 0 &&
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div>
                                <div className={styles.cart__table}>

                                    <div className={styles.row}>
                                        <div className={styles.cart__table__header}>Item</div>
                                        <div className={styles.cart__table__header}>Quantity</div>
                                        <div className={`${styles.cart__table__header} ${styles.headerLargeScreen}`}>
                                            Price
                                        </div>
                                        <div className={`${styles.cart__table__header} ${styles.headerLargeScreen}`}>
                                            Delivery
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {items.map((item, index) => (
                                            <CartItem key={index} item={item} handleQuantityChange={handleQuantityChange}/>
                                        ))}
                                    </AnimatePresence>

                                </div>
                            </div>
                            <div className={styles.cart__footer}>
                                <p className={styles.cart__bigText}>TOTAL PRICE: {getTotalPrice(items).toFixed(2)} {items[0].book.saleInfo.listPrice?.currencyCode}</p>
                                <button className={styles.btn}>Checkout</button>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </section>
        </>
    )
}