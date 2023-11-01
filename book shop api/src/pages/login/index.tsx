import styles from "./Login.module.scss";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {IProfileState, setToken, setUser} from "@/store/profile";


export default function Login() {
    const token = useSelector((state: IProfileState) => state.token);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
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
                } else {
                    dispatch(setToken(res.token));
                    dispatch(setUser(res.user));
                    router.push("/profile");
                }
            }).catch((err) => {
            setLoading(false);
            setError(err.message);
        });
    }

    useEffect(() => {
        if (token) {
            router.push("/profile");
        }
    }, []);

    return (
        <section className={styles.Login}>
            <div className={styles.LoginFormWrapper}>
                <form method="POST">

                    <div className={styles.LoginForm}>
                        <h1>Login to your account</h1>
                        <input
                            className={styles.textInput} type="email" name="email" placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={styles.textInput} type="password" name="password" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {loading && <Loader/>}
                        {error && <div className={styles.error}>{error}</div>}
                        <button type="submit" className={styles.btn} onClick={handleSubmit}>Login</button>
                    </div>
                </form>
            </div>
        </section>
    )
}