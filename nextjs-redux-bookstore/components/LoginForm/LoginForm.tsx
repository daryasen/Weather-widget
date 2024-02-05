
import styles from './loginForm.module.css';
import { montserrat } from '../../app/layout';
import { loginReducer, selectEmailDirty, selectPasswordDirty, selectEmailError, selectPassError, emailDirtyReducer, passDirtyReducer, selectEmail, selectPassword, emailReducer, passReducer, emailErrorReducer, passErrorReducer, selectValidForm, validFormReducer, setMailProfile, setNameProfile } from '@/redux/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

    const { push } = useRouter();
    const dispatch = useAppDispatch();

    const emailDirty = useAppSelector(selectEmailDirty);
    const passDirty = useAppSelector(selectPasswordDirty);
    const emailError = useAppSelector(selectEmailError);
    const passError = useAppSelector(selectPassError);
    const email = useAppSelector(selectEmail);
    const password = useAppSelector(selectPassword);
    const validForm = useAppSelector(selectValidForm);


    const blurHeandler = (e: React.FocusEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email': 
                dispatch(emailDirtyReducer(true));
                break;

            case 'password':
                dispatch(passDirtyReducer(true));
                break;
        }
    };

    const emailHeandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(emailReducer(e.target.value));
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!reg.test(String(e.target.value).toLowerCase())) {
            dispatch(emailErrorReducer('Не корректный Email'));
            if(!e.target.value) {
                dispatch(emailErrorReducer('Email не может быть пустым'));
            }
        }else {
            dispatch(emailErrorReducer(''));
        }
    };

    const passHeandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(passReducer(e.target.value));
        if(e.target.value.length < 6 || e.target.value.length > 9) {
            dispatch(passErrorReducer('Пороль должен быть больше 6 и меньше 9 символов'));
            if(!e.target.value) {
                dispatch(passErrorReducer('Пороль не может быть пустым'));
            }
        }else {
            dispatch(passErrorReducer(''));
        }
    };

    useEffect(() => {
        if(emailError || passError) {
            dispatch(validFormReducer(false))
        }else {
            dispatch(validFormReducer(true))
        }

    }, [emailError, passError]) 

    const heandleLogin = async  (e: React.MouseEvent<HTMLElement>) => {
        dispatch(loginReducer());
        e.preventDefault();

        const res = await fetch('http://localhost:3000//api/auth', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ 'email': email, 'password': password }),
        
        });
        if (res.status !== 200) {
            // push('/404');  
    
        }else {
            const receivedData = await res.json();
            if (!receivedData.error) {
            dispatch(setMailProfile(receivedData.mail));
            dispatch(setNameProfile(receivedData.name));
            push(`/profile`);
            }else {
              // push('/404');
            }
        }
    }
    


    return (
        <div className={styles.containerForm}>
            <h2 className={montserrat.className+' '+styles.titleLogin}>Log in</h2>
            <form className={styles.form}>

                <h2 className={montserrat.className+' '+styles.titleInput}>Email</h2>
                <input onChange={e => emailHeandler(e)} value={email} onBlur={e => blurHeandler(e)} className={styles.input} type="email" name="email" placeholder="Enter your email..." />

                {(emailDirty && emailError) && <p className={montserrat.className+' '+styles.warn}>{emailError}</p>}

                <h2 className={montserrat.className+' '+styles.titleInput}>Password</h2>
                <input onChange={e => passHeandle(e)} value={password}  onBlur={e => blurHeandler(e)} className={styles.input} type="password" name="password" placeholder="Enter your password..." />

                {(passDirty && passError) && <p className={montserrat.className+' '+styles.warn}>{passError}</p>}

                <button disabled={!validForm} className={validForm ? styles.button : styles.buttonDisable} type="submit" onClick={(e) => heandleLogin(e)}>LOG IN</button>

            </form>
        </div>
    )
}