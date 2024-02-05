'use client';

import styles from './btnLoadMore.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loadDataReducer, selectLogin } from '@/redux/selectors';


export default function BtnLoadMore() {

    const login = useAppSelector(selectLogin);
    const dispatch = useAppDispatch();

    return (
        <>
            {login && <button onClick={() => dispatch(loadDataReducer(6))} className={styles.btnLoadMore} type="button">Load more</button>}
        </>
    )
}
