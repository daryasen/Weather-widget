"use client"

import Image from 'next/image';
import styles from './slider.module.css';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { selectSlider, selectSliderIndex, sliderReducer, moveDotsReducer } from '@/redux/selectors';
import { sliderData } from '@/datas/sliderData';


export default function Slider() {

    //const imageSlider = useAppSelector(selectSlider);
    const indexSlider = useAppSelector(selectSliderIndex);
    const dispatch = useAppDispatch()

useEffect(() => {
    let intervalId = setInterval(() => {
        dispatch(sliderReducer())
        }, 5000);
        return () => clearInterval(intervalId);
    }, [indexSlider]); 

    return (
        <div className={styles.containerSlider}>
            {sliderData.map((item, itemIndex) => {

                return (
                    <div className={indexSlider === itemIndex ? styles.positionActive : styles.positionSlide} key={item.id}>
                        <Image src={item.image} alt={'BUNNER'} width={1120} height={702}></Image>
                    </div>
                )
    })}
            <div className={styles.containerDots}>
                {Array.from({length: 3}).map((item, index) => {

                    return (
                        <div key={index} onClick={() => dispatch(moveDotsReducer(index))}
                        className={indexSlider === index ? styles.activeDote : styles.dot}>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

