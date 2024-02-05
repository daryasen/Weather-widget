"use client";

import React from 'react';
import styles from './filterBooksCategory.module.css';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectCategory, selectCategoryParams, filterCategoryReducer, selectLogin } from '@/redux/selectors';
import { montserrat } from '@/app/layout';
import Books from '@/components/Books/Books';


export default function FilterBooksCategory() {

    const login = useAppSelector(selectLogin);
    const category = useAppSelector(selectCategory);
    const subjectCategory = useAppSelector(selectCategoryParams);
    const dispatch = useAppDispatch()

    const handleFilterCategory = (e: React.MouseEvent<HTMLElement>) => {
        let nodeTarget = e.target as HTMLDivElement;
        let indexDataSet = nodeTarget.dataset.category as string;
        dispatch(filterCategoryReducer(indexDataSet));
        e.stopPropagation();
    }

    return (
        <>
            {login && <div className={styles.containerShowcase}>
                <div className={styles.categoryBooks}>
                    <ul className={montserrat.className+ ' ' +styles.categoryBooksList}>
                        {category.map((item, index) => <li key={index} data-category={item} onClick={(e) => handleFilterCategory(e)} className={subjectCategory === item ? styles.categoryActive : styles.categoryBooksItem }>{item}</li>)} 
                    </ul>
                </div>
                <Books />
            </div>}
        </>
    )
}