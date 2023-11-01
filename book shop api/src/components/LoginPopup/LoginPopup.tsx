import styles from "./LoginPopup.module.scss";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {setCart, setToken, setUser} from "@/store/profile";
import {useState} from "react";
import {useRouter} from "next/router";
import {RootState} from "@/store";
import Loader from "@/components/Loader/Loader";


export default function LoginPopup() {
    const token = useSelector((state: RootState) => state.profile.token);
    const [showDropDown, setShowDropDown] = useState(false);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleLogout = () => {
        dispatch(setToken(""));
        dispatch(setUser({
            email: '',
            name: '',
            about: '',
        }));
        dispatch(setCart([]));
        router.push("/");
        setShowDropDown(false);
    }

    const handleShowDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setLoading(false);
                if (res.error) {
                    setError(res.message);
                    if (res.fields.includes("email")) {
                        setEmailError(true);
                    }
                    if (res.fields.includes("password")) {
                        setPasswordError(true);
                    }
                } else {
                    dispatch(setToken(res.token));
                    dispatch(setUser(res.user));
                    router.push("/profile");
                    setShowDropDown(false);
                }
            }).catch((err) => {
            setLoading(false);
            setError(err.message);
        });
    }

    return <div className={styles.LoginPopup}>
        <button className={styles.profile__btn + " " + styles.profile__btn__user} onClick={handleShowDropDown}></button>
        {showDropDown &&
            <div className={styles.LoginPopup__dropDown}>
                {token ? <div className={styles.buttonWrapper}>
                    <Link href={"/profile"} className={styles.button}>View profile</Link>
                    <button className={styles.button} onClick={handleLogout}>Log out</button>
                </div> : <>
                    <h1 className={styles.header}>Log in</h1>
                    <form method={"POST"} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email">Email</label>
                            <input className={`${styles.input} ${emailError ? styles.input__error : ""}`}
                                   type="email" placeholder={"Email"}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="password">Password</label>
                            <input className={`${styles.input} ${passwordError ? styles.input__error : ""}`}
                                   type="password" placeholder={"Password"}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {loading && <Loader/>}
                        <div className={styles.error}>{error}</div>
                        <button className={styles.button} type={"submit"} onClick={handleSubmit}>Log in</button>
                    </form>
                </>}
            </div>
        }

    </div>
}