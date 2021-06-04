import styles from '../styles/Login.module.css'
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';

const Login = ()=>{

    const signIn = ()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    
    return(
    <div className={styles.LoginWrapper}>
        <Head>
        <link rel="icon" href="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
            <title>Login</title>
        </Head>
        <div className={styles.loginContainer}>
            <img className={styles.loginimg} src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
            <Button onClick={signIn} className={styles.GoogleButton}>
                Sign in with Gooogle
            </Button>
        </div>
    </div>
    )
}

export default Login