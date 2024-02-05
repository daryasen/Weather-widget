
import { useEffect} from "react";
import { fetchBooks } from '@/redux/fetchGet';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectDataBooks, selectLoadParams, selectLogin } from '@/redux/selectors';
import { montserrat, openSans } from '@/app/layout';
import Image from "next/image";
import BtnLoadMore from '@/components/BtnLoadMore/BtnLoadMore';
import styles from './books.module.css';
import BtnBuy from '@/components/BtnBuy/BtnBuy';


export default function Books() {

    const login = useAppSelector(selectLogin);
    const loadParams = useAppSelector(selectLoadParams);
    const dataListBooks = useAppSelector(selectDataBooks);
    const dispatch = useAppDispatch();

    
    useEffect(() => {
        dispatch(fetchBooks(loadParams));
    }, [loadParams]);

    
    return (
        <div className={styles.containerBooks}>
            {login && dataListBooks.map((item) => <div key={item.id} className={styles.bookPosition}>
                <Image className={`${item.volumeInfo?.imageLinks?.thumbnail ? styles.bookPositionImage : styles.bookPositionImageNone}`} src={`${item.volumeInfo?.imageLinks?.thumbnail}`} alt={`${item.volumeInfo?.title}`} width={212} height={310} />
                <div className={styles.bookPositionInfo}>
                    <h2 className={openSans.className+' '+styles.bookPositionInfoAuthor}>{item.volumeInfo?.authors}</h2>
                    <h2 className={montserrat.className+' '+styles.bookPositionInfoTitle}>{item.volumeInfo?.title.length < 40 ? item.volumeInfo?.title.slice(0, 40) + '. . .' : item.volumeInfo?.title}</h2>
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
                    <h2 className={`${item.volumeInfo?.description ? styles.bookPositionInfoDescription : styles.displayNone}`}>${item.volumeInfo?.description}</h2>
                    <h2 className={`${item.saleInfo?.retailPrice?.amount ? styles.bookPositionInfoSale : styles.displayNone}`}>&#36;{item.saleInfo?.retailPrice?.amount}</h2>
                    <BtnBuy id={item.id} />
                </div>
            </div>)}
            <BtnLoadMore />
        </div>
    )
}







