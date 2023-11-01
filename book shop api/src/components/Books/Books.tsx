import styles from "./Books.module.scss";
import {IBook} from "@/data/types";
import Image from "next/image";
import React from "react";
import {noImageSrc} from "@/data/constants";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "@/store/profile";
import {RootState} from "@/store";
import {AnimatePresence, motion} from "framer-motion";


type BooksProps = {
    books: IBook[];
}

type BookProps = {
    book: IBook;
    isInCart: boolean;
}

type BuyBtnProps = {
    saleAbility: boolean,
    isInCart: boolean,
    handleBuy: () => void,
}

const BuyBtn = (props: BuyBtnProps) => {
    const {saleAbility, isInCart, handleBuy} = props;

    if (saleAbility && !isInCart) {
        return (
            <button className={styles.btn} onClick={handleBuy}>Buy now</button>
        );
    } else if (!saleAbility && !isInCart) {
        return (
            <button className={styles.btn} disabled>Not available</button>
        );
    } else if (isInCart) {
        return (
            <button className={styles.btn} disabled>In cart</button>
        );
    }
};


const Book = (props: BookProps) => {
    const {book, isInCart} = props;
    const dispatch = useDispatch();
    const handleBuy = () => {
        dispatch(addToCart({book: book, quantity: 1}));
    }

    return (
        <motion.div
            className={styles.book}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5}}
        >
            <div className={styles.book__poster}>
                {
                    book.volumeInfo.imageLinks ?
                        <Image
                            src={book.volumeInfo.imageLinks.thumbnail}
                            alt={book.volumeInfo.title} width={212} height={295}
                        /> :
                        <Image
                            src={noImageSrc}
                            alt={"No picture"} width={212} height={212}
                        />
                }

            </div>
            <div className={styles.book__details}>
                <div className={styles.book__author}>{book.volumeInfo.authors}</div>
                <div className={styles.book__title}>{book.volumeInfo.title}</div>
                <div className={styles.book__rating}>
                    <div className={styles.book__rating__stars} style={{
                        "--rating": book.volumeInfo.averageRating ?? 0
                    } as React.CSSProperties}></div>
                    <div className={styles.book__rating__reviews}>{book.volumeInfo.ratingsCount ?? 0} reviews</div>
                </div>
                <div
                    className={styles.book__description}>
                    {book.volumeInfo.description?.substring(0, 100)} {
                    book.volumeInfo.description?.length && book.volumeInfo.description?.length > 100 ? "..." : ""}
                </div>
                <div className={styles.book__price}>
                    {book.saleInfo.listPrice?.amount ?? "NOT FOR SALE"} {book.saleInfo.listPrice?.currencyCode}
                </div>
                <BuyBtn saleAbility={book.saleInfo.saleability === "FOR_SALE"} isInCart={isInCart}
                        handleBuy={handleBuy}/>
            </div>
        </motion.div>
    );
};

export default function Books(props: BooksProps) {
    const {books} = props;
    const {cart} = useSelector((state: RootState) => state.profile);

    return <section className={styles.book__section}>
        <div className={styles.book__list}>
            <AnimatePresence>
                {books.map(book => <Book
                    key={book.id}
                    book={book}
                    isInCart={cart.some(cartItem => cartItem.book.id === book.id)}
                />)}
            </AnimatePresence>
        </div>
    </section>;
}