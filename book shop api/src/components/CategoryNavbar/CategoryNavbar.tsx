import Link from "next/link";
import styles from "./CategoryNavbar.module.scss";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";


type CategoryNavbarProps = {
    currentCategory: string,
}


export default function CategoryNavbar(props: CategoryNavbarProps) {
    const [showNav, setShowNav] = useState(false);
    const {currentCategory} = props;
    const categoryNavbarItems = [
        'Architecture',
        'Art & Fashion',
        'Biography',
        'Business',
        'Crafts & Hobbies',
        'Drama',
        'Fiction',
        'Food & Drink',
        'Health & Wellbeing',
        'History & Politics',
        'Humor',
        'Poetry',
        'Psychology',
        'Science',
        'Technology',
        'Travel & Maps',
    ];

    return <nav className={styles.CategoryNavbar}>
        <div className={styles.CategoryNavbar__controls}>
            <button onClick={() => setShowNav(!showNav)}>
                {showNav ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <line x1="2" y1="2" x2="22" y2="22" stroke="#4C3DB2" strokeWidth="2"/>
                    <line x1="2" y1="22" x2="22" y2="2" stroke="#4C3DB2" strokeWidth="2"/>
                </svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21" stroke="#4C3DB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12H21" stroke="#4C3DB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18H21" stroke="#4C3DB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>}
            </button>
        </div>
        <AnimatePresence>


            {showNav &&
                <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5 }}
                    className={styles.sidebar__links}>
                    {categoryNavbarItems.map((item: string, index: number) => (
                        <motion.li
                            key={index}
                            initial={{  opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            // style={{ overflow: "hidden" }}
                            className={`${styles.sidebar__link} ${currentCategory === item && styles.sidebar__link__active}`}
                        >
                            <Link
                                href={`?${new URLSearchParams({subject: item}).toString()}`}
                                scroll={true}
                            >{item}</Link>
                        </motion.li>
                    ))}
                </motion.ul>
            }
        </AnimatePresence>
    </nav>
}