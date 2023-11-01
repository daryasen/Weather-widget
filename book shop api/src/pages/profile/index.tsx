import styles from "./Profile.module.scss";
import Image from "next/image";
import Img from "@/../public/img/png/image 1.png";
import {useSelector} from "react-redux";
import {RootState} from "@/store";


export default function Profile() {
    const user = useSelector((state: RootState) => state.profile.user);

    return <div className={styles.Profile}>
        <div className={styles.Profile__main}>
            <h1 className={styles.Profile__header}>Profile</h1>
            <div className={styles.Profile__data}>
                <div>
                    <Image src={Img} alt={"avatar"} width={235} height={235} />
                </div>
                <div className={styles.dataGroup__wrapper}>
                    <div className={styles.dataGroup}>
                        <label className={styles.dataGroup__label}>YOUR NAME</label>
                        <p className={styles.dataGroup__text}>{user.name}</p>
                    </div>
                    <div className={styles.dataGroup}>
                        <label className={styles.dataGroup__label}>YOUR EMAIL</label>
                        <p className={styles.dataGroup__text}>{user.email}</p>
                    </div>
                    <button className={styles.btn}>Edit profile</button>
                </div>
            </div>
        </div>
        <div className={styles.Profile__description}>
            <h2 className={styles.Profile__description__header}>ABOUT ME</h2>
            <p className={styles.Profile__description__text}>{user.about}</p>
        </div>
    </div>
}