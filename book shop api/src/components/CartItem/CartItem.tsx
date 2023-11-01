import styles from "./CartItem.module.scss";
import {ICartItem} from "@/store/profile";
import Image from "next/image";
import React from "react";
import NumberInput from "@/components/NumberInput/NumberInput";
import {motion} from "framer-motion";


type CartItemProps = {
    item: ICartItem;
    handleQuantityChange: (item: ICartItem, value: number) => void;
}

export default function CartItem(props: CartItemProps) {
    const {item, handleQuantityChange} = props;
    const handleItemQuantityChange = (value: number) => {
        handleQuantityChange(item, value);
    }

    return <motion.div
        className={styles.row}
        initial={{opacity: 1, height: "auto"}}
        exit={{opacity: 0, height: 0}}
        transition={{duration: 0.5}}
    >
        <div>
            <div className={styles.CartItem}>
                <div className={styles.book__poster}>
                    <Image src={item.book.volumeInfo.imageLinks.thumbnail} alt={item.book.volumeInfo.title}
                           width={100} height={140}/>
                </div>
                <div className={styles.book__details} style={{paddingLeft: 8, paddingRight: 8}}>

                    <div className={styles.book__title}>{item.book.volumeInfo.title}</div>
                    <div className={styles.book__author}>{item.book.volumeInfo.authors}</div>
                    <div className={styles.book__rating}>
                        <div className={styles.book__rating__stars} style={{
                            "--rating": item.book.volumeInfo.averageRating ?? 0
                        } as React.CSSProperties}></div>
                        <div className={styles.book__rating__reviews}>{item.book.volumeInfo.ratingsCount ?? 0} reviews
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.quantity}>
            <NumberInput value={item.quantity} handleChange={handleItemQuantityChange}/>
            <div className={`${styles.price} ${styles.price__small}`}>
                {item.book.saleInfo.listPrice && (item.book.saleInfo.listPrice?.amount * 100 * item.quantity / 100).toString()} {item.book.saleInfo.listPrice?.currencyCode}
            </div>
            <div className={`${styles.delivery} ${styles.delivery__small}`}>Shipping: delivery</div>
        </div>
        <div className={styles.price}>
            {item.book.saleInfo.listPrice && (item.book.saleInfo.listPrice?.amount * 100 * item.quantity / 100).toString()} {item.book.saleInfo.listPrice?.currencyCode}
        </div>
        <div className={styles.delivery}>Shipping: delivery</div>
    </motion.div>
}