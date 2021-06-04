import Head from 'next/head'
import SideNav from '../../Components/SideNav'
import styles from '../../styles/main.module.css'
import ChatScreen from '../../Components/ChatScreen'
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import getRecipientEmail from '../../util/getRecipientEmail';


const Chat = ({chat, messages})=>{

    const [user] = useAuthState(auth);

    return(
        <div className={styles.MainContainer}>
            <Head>
                <link rel="icon" href="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" />
                <title>Chat with { getRecipientEmail(chat.users, user) }</title>
            </Head>
                <SideNav />
            <div>
                <ChatScreen chat={chat} messages={messages} />
            </div>
        </div>
    )
}

export default Chat;


export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.query.id);

    // Prep the messages on the server

    const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

    const messages = messagesRes.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })).map((messages) => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
    }))

    /// prep the chats

        const chatRes = await ref.get();
        const chat = {
            id: chatRes.id,
            ...chatRes.data(),
        }


        return{
            props:{
                messages:JSON.stringify(messages),
                chat: chat,
            },
        };
}