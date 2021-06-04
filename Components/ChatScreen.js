import { Avatar, Button, IconButton } from '@material-ui/core';
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth,db } from '../firebase';
import styles from '../styles/chatScreen.module.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useCollection } from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useRef, useState } from 'react';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message'
import getRecipientEmail from '../util/getRecipientEmail';
import TimeAgo from 'timeago-react';
import styled from 'styled-components';


const ChatScreen = ({ chat, messages})=>{

    const [ user ] = useAuthState(auth);
    const [ input, setInput] = useState("");
    const endOfMessagesRef = useRef(null);
    const router = useRouter();

    const [ messagesSnapshot ] = useCollection(
        db
        .collection('chats')
        .doc(router.query.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        );

    const [recipientSnapshot] = useCollection(
        db
        .collection("users")
        .where("email", "==", getRecipientEmail(chat.users, user))
    )

       
    const showMessages = ()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message) =>(
                <Message
                key={message.id}
                user={message.data().user}
                message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ));
        } else{
            return JSON.parse(messages).map((message) =>{
                <Message key={message.id} user={message.user} message={message} />
            })
        }
    }

    const scrollToBottom = ()=>{
       endOfMessagesRef.current.scrollIntoView({
           behaviour:" smooth",
           block: 'start',
       });
    }

    const sendMessage = (e)=>{
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen : firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true});

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput('');
        scrollToBottom();
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user)
    return(
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                {recipient ? (
                    <Avatar src={recipient?.photoURL}/>
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <div className={styles.headerInfo}>
                    <h3>{recipientEmail}</h3>
                {recipientSnapshot ? (
                    <p>Last seen: {' '}
                    {recipient?.lastSeen?.toDate() ? (
                        <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                    ) : "Unavailable"}
                    </p>
                ): (
                    <p>Loading Last active ...</p>
                )}
                    
                    
                </div>
                <div className={styles.headerIcons}>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div >
            <div className={styles.messageContainer}>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}>
                </EndOfMessage>
            </div>
            <form className={styles.inputContainer}>
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <input type='text' className={styles.form} value={input} onChange={(e) =>setInput(e.target.value)} />
                {/* <button >Send Message</button> */}
                <Button onClick={sendMessage} type='submit' role='button' disabled={!input}> 
                    <SendIcon />
                </Button>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </form>
        </div>
    )
}

export default ChatScreen;



const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;