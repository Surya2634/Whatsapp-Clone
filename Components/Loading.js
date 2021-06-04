import { Circle } from 'better-react-spinkit';
import styles from '../styles/Loading.module.css'

const Loading = ()=>{
    return(
        <div className={styles.Loading}>
            <img 
            src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png'
            alt='Page is Loading Man'
            height={200}
            />
            <Circle color='#3CBC28' size={60} />
        </div>
    )
}

export default Loading;