'use client';

import styles from './btnBuy.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addItemsCartReducer, deleteItemsCartReducer, selectDataBooks, selectCartItems } from '@/redux/selectors';
import { TpropsBtnBuy } from '@/types/types';


export default function BtnBuy({id}: TpropsBtnBuy) {

    const dataItemsCart = useAppSelector(selectCartItems);
    const dataListBooks = useAppSelector(selectDataBooks);
    const dispatch = useAppDispatch();
    //console.log(dataItemsCart)
    
    const heandleBuyBook = (e: React.MouseEvent<HTMLElement>) => {

        let nodeTarget = e.target as HTMLDivElement;
        let indexDataSet = nodeTarget.dataset.btnbuy as string; 

        if(dataItemsCart.filter(book => book.id === indexDataSet).length <= 0) {
            dispatch(addItemsCartReducer(dataListBooks.find(book => book.id === indexDataSet)));
        }else {
            dispatch(deleteItemsCartReducer(indexDataSet));
        }
    }


    return (
        <>
            <button className={styles.btnBuyNow} type="button" data-btnbuy={id} onClick={(e) => heandleBuyBook(e)}>{dataItemsCart.find(book => book.id === id) ? 'IN THE CART' : 'BUY NOW'}</button>
        </>
    )
}