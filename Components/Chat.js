import { Avatar, IconButton } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import styles from '../styles/chat.module.css';
import getRecipientEmail from '../util/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

const Chat = ({id, users})=>{
     const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapShot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)))
    const recipientEmail = getRecipientEmail(users, user)

    const recipient = recipientSnapShot?.docs?.[0]?.data();

        const enterChat = ()=>{
            router.push(`/chat/${id}`)
        }


    return(
        <div onClick={enterChat} className={styles.ChatContainer}>
            <div>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} className={styles.useravatar}/>
                    ) : (
                    <Avatar className={styles.useravatar}>{recipientEmail[0]}</Avatar>
                    )
                }
            </div>
            <div className={styles.Chatscreen}>
                <p>{recipientEmail}</p>
            </div>
        </div>
    )
}

export default Chat;
