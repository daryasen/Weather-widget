'use client'

import styles from './profile.module.css';
import Image from 'next/image';
import image_profile from '../../public/images/image_profile.png';
import { useAppSelector} from '@/redux/store';
import { selectMailProfile, selecNameProfile } from '@/redux/selectors';

export default function Profile() {

    const mailProfile = useAppSelector(selectMailProfile);
    const nameProfile = useAppSelector(selecNameProfile);

    return (
        <div className={styles.containerProfile}>
            <div className={styles.infoProfile}>
                <div className={styles.infoProfileTitle}>PROFILE</div>
                <div className={styles.infoProfileGeneralData}>
                    <Image src={image_profile} alt='image_profile' width={235} height={235} className={styles.infoProfileImage}></Image>
                    <div className={styles.infoProfileData}>
                        <h2 className={styles.infoProfileDataTitle}>YOUR NAME</h2>
                        <h3 className={styles.infoProfileDataText}>John Smith</h3>
                        <h2 className={styles.infoProfileDataTitle}>YOUR EMAIL</h2>
                        <h3 className={styles.infoProfileDataText}>example@mail.com</h3>
                        <button className={styles.infoProfileButton}>EDIT PROFILE</button>
                    </div>
                </div>
            </div>
            <div className={styles.aboutProfile}>
                <h2 className={styles.aboutProfileTitle}>ABOUT ME</h2>
                <h3 className={styles.aboutProfileText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac varius.</h3>
            </div>
        </div>
    )
}