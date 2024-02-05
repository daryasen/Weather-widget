"use client"

import styles from './cart.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { montserrat, openSans } from '@/app/layout';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { increaseReducer, decreaseReducer, selectCartItems, selectViewItemCount, selectGeneralArreyCart } from '@/redux/selectors';


export default function Cart() {

    const cartItems = useAppSelector(selectCartItems);
    const cartItemsDetails = useAppSelector(selectViewItemCount);
    const generalArreyCart = useAppSelector(selectGeneralArreyCart);
    
    
    const dispatch = useAppDispatch();

    const getTotal = () => {
        let itemTotal = 0;
        let totalPrice = 0;
        generalArreyCart.forEach(item => {
        itemTotal = item.saleInfo?.retailPrice?.amount ? item.saleInfo?.retailPrice?.amount * generalArreyCart.length : 0;
        })
        totalPrice = totalPrice + itemTotal;
        return {totalPrice}
    }

    const heandlePlus = (e: React.MouseEvent<HTMLElement>) => {
        let nodeTarget = e.target as HTMLDivElement;
        let indexDataSet = nodeTarget.dataset.btncount as string;
        dispatch(increaseReducer(cartItems.find(book => book.id === indexDataSet)));
    };

    const heandleMinus = (e: React.MouseEvent<HTMLElement>) => {
        let nodeTarget = e.target as HTMLDivElement;
        let indexDataSet = nodeTarget.dataset.btncount as string;
        dispatch(decreaseReducer(indexDataSet));
    };
    
    return (
        <div className={styles.containerCart}>
            <h2 className={styles.titleCart}>SHOPPING CART</h2>
            <div className={styles.columnBlock}>
                <h3 className={styles.nameColumn+' '+styles.item}>ITEM</h3>
                <h3 className={styles.nameColumn+' '+styles.quantity}>QUANTITY</h3>
                <h3 className={styles.nameColumn+' '+styles.price}>PRICE</h3>
                <h3 className={styles.nameColumn+' '+styles.delivery}>DELIVERY</h3>
            </div>
            {cartItems.map((item) => 
            <div className={styles.containerInfo} key={item.id}>
                <div className={styles.itemFoto}>
                    <Image className={`${item.volumeInfo?.imageLinks?.thumbnail ? styles.bookPositionImage : styles.bookPositionImageNone}`} src={`${item.volumeInfo?.imageLinks?.thumbnail}`} alt={`${item.volumeInfo?.title}`} width={102} height={145} />
                    <div className={styles.itemInfo}>
                        <h2 className={montserrat.className+' '+styles.bookPositionInfoTitle}>{item.volumeInfo?.title.length < 40 ? item.volumeInfo?.title.slice(0, 15) + '. . .' : item.volumeInfo?.title}</h2>
                        <h3 className={openSans.className+' '+styles.bookPositionInfoAuthor}>{item.volumeInfo?.authors}</h3>
                        <div className={`${item.volumeInfo?.averageRating ? styles.ratingBlock : styles.displayNone}`}>
                            <div className={`${item.volumeInfo?.averageRating === 1 ? styles.ratingBlockStarsAll : styles.displayNone}`}>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                            </div>
                            <div className={`${item.volumeInfo?.averageRating === 2 ? styles.ratingBlockStarsAll : styles.displayNone}`}>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                            </div>
                            <div className={`${item.volumeInfo?.averageRating === 3 ? styles.ratingBlockStarsAll : styles.displayNone}`}>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                            </div>
                            <div className={`${item.volumeInfo?.averageRating === 4 ? styles.ratingBlockStarsAll : styles.displayNone}`}>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsGrey}></div>
                            </div>
                            <div className={`${item.volumeInfo?.averageRating === 5 ? styles.ratingBlockStarsAll : styles.displayNone}`}>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                                <div className={styles.ratingBlockStarsYellow}></div>
                            </div>
                            <h2 className={`${item.volumeInfo?.ratingsCount ? styles.ratingBlockCount : styles.displayNone}`}>{item.volumeInfo?.ratingsCount} review</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.quantityInfo}>
                    <button className={styles.buttonMinus} data-btncount={item.id} onClick={(e) => heandleMinus(e)} >&minus;</button>
                    <div className={montserrat.className+' '+styles.infoCount}>{cartItemsDetails.filter(book => book.id === item.id).length + 1}</div>
                    <button className={styles.buttonPlus} data-btncount={item.id} onClick={(e) => heandlePlus(e)} >&#43;</button>
                </div>
                <div className={styles.wrapperPrice}>
                    <h3 className={`${item.saleInfo?.retailPrice?.amount ? styles.priceInfo : styles.displayNone}`}>&#36;{item.saleInfo?.retailPrice?.amount}</h3>
                </div>
                <h3 className={montserrat.className+' '+styles.deleveryInfo}>Shipping: delivery</h3>
            </div>)}
            <h3 className={styles.totalPrice}>TOTAL PRICE: ${getTotal().totalPrice.toFixed(2)}</h3>
            <Link href="/"><button className={styles.button}>CHECKOUT</button></Link>
        </div>
    )
}