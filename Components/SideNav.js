import { IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from '../styles/SideNav.module.css';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'; 
import Chat from './Chat';


const SideNav = ()=>{
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const startChat = ()=>{
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if(!input) return null;

    if(EmailValidator.validate(input) && !chatAlreadyExisits(input) && input !== user.email){
      db.collection('chats').add({
        users : [user.email, input],
      })
    }
  }

  const chatAlreadyExisits = (recipientEmail)=>{
    !!chatsSnapshot?.docs.find(
      (chat)=> 
          chat.data().users.find((user)=> user === recipientEmail)?.length > 0
    )
  }


  return(
      <div className={styles.Container}>
        <div className={styles.navTop}>
          <div>
            <IconButton className={styles.Avatar}>
              <Avatar src={user.photoURL} onClick={ ()=> auth.signOut() } />
            </IconButton>
          </div>
          <div>
            <IconButton className={styles.Message}>
              <MessageIcon/>
            </IconButton>
            <IconButton className={styles.more}>
              <MoreVertIcon/>
            </IconButton>
          </div>
        </div>
        <div className={styles.searchWrapper}>
            <SearchIcon className={styles.SearchIcon}/>
            <input className={styles.searchBox} type='text' placeholder='Search or start new chat' />
        </div>
        <div>
          <hr/><Button className={styles.ChatButton} onClick={startChat}>START A NEW CHAT</Button><hr />
        </div>
        <div>
          {chatsSnapshot?.docs.map((chat)=>(
            <Chat key={chat.id} id = {chat.id} users={chat.data().users} />
            ))}
        </div>
      </div>
  )
}

export default SideNav;

