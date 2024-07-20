import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import userProfile from '../../../Assets/Images/userProfile2.png';
import AddUser from './AddUser';
import useUserStore from '../../../lib/userStore';
import { onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const firestore = getFirestore(app);
const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const { currentUser } = useUserStore();
    useEffect(() => {
        const unSub = onSnapshot(doc(firestore, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;
            const promises = items.map( async(item) => {
                const docRef = doc(firestore, 'users', item.receiverId);
                const docSnap =  await getDoc(docRef);
    
                const user = docSnap.data();
                return {...item, user};
            });
            const chatData = await Promise.all(promises);
            setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt));
            console.log(chats);
        })

        return () => {
            unSub();
        }
    }, [])
    return (
        <div className='chat-list'>
            <div className="search">
                <div className="searchBar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='faMagnifyingGlass'/>
                    <input type="text" placeholder='Search...'/>
                </div>
            <FontAwesomeIcon icon={addMode ? faMinus : faPlus} className='faPlus' onClick={ () => setAddMode(addMode ? false : true) }/>
            </div>
            {
                chats.map((chat) =>
                    (<div className="item" key={chat.chatId}>
                        <img src={chat.user.avatar} alt="" />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat.user.lastMessage}</p>
                        </div>
                    </div>)
                )
            }
            {addMode && <AddUser chats={chats}/>}
        </div>
    )
}
export default ChatList;
