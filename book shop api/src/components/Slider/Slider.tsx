import styles from "./Slider.module.scss";
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import First from "../../../public/slider/1.png";
import Second from "../../../public/slider/2.png";
import Third from "../../../public/slider/3.png";

const items = [
    First,
    Second,
    Third,
];

export default function Slider() {

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => prevIndex === items.length - 1 ? 0 : prevIndex + 1);
        }, 3000);
        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <section className={styles.Slider}>
            <div className={`${styles.banner} ${styles.banner__tr}`}>
                <h4>Change old book on new</h4>
                <button className={styles.arrow}></button>
            </div>
            <div className={`${styles.banner} ${styles.banner__br}`}>
                <h4>top 100 books 2022</h4>
                <button className={styles.arrow}></button>
            </div>
            <div className={styles.Slider__container}>
                <motion.div
                    className={styles.Slider__img}
                    style={{
                        backgroundImage: `url(${items[index].src})`
                    }}
                    key={index}
                    initial={{x: 300, opacity: 0}}
                    animate={{x: 0, opacity: 1}}
                    exit={{x: -300, opacity: 0}}
                />
            </div>

            <div className={styles.Slider__controls}>
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setIndex(i);
                        }}
                        className={`${styles.Slider__control} ${index === i ? styles.Slider__control__active : ""}`}
                    ></button>
                ))}
            </div>
        </section>
    );
}