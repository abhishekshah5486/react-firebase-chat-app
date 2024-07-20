import './AddUser.css';
import userProfile from '../../../../Assets/Images/userProfile2.png';
import { arrayUnion, collection, query, serverTimestamp, setDoc, updateDoc, where, orderBy, startAt, endAt } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../../../lib/firebase';
import { getDocs } from 'firebase/firestore';
import { useState } from 'react';
import useUserStore from '../../../../lib/userStore';
import { message } from 'antd';

const firestore = getFirestore(app);
const AddUser = ({chats}) => {
    const [users, setUsers] = useState(null);
    const [classNameAdded, setClassNameAdded] = useState(false);
    const { currentUser } = useUserStore();
    const [disableAddUserButton, setDisableAddUserButton] = useState(false);

    const handleSearchUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const usersRef = collection(firestore, "users");
            // const userQuery = query(usersRef, where("username", "==", username));
            const userQuery = query(usersRef, orderBy("username"), startAt(username), endAt(username + "\uf8ff"));
            const querySnapshot = await getDocs(userQuery);
            if (!querySnapshot.empty){
                // setUser(querySnapshot.docs[0].data());
                setUsers(querySnapshot.docs);
                setClassNameAdded(false);
            }
            else{
                setUsers(null);
                setClassNameAdded(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleAddUser = async (user) => {
        const userDetails = user.data();
        const isUserActive = chats.some((chat) => userDetails.username === chat.user.username);
        if (isUserActive){
            message.error("User is already an active member.");
            return;
        }

        const chatRef = collection(firestore, 'chats');
        const userChatsRef = collection(firestore, 'userchats');
        try {
            const docRef = doc(chatRef);
            await setDoc(docRef, {
                createdAt: serverTimestamp(),
                message: []
            })

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    chatId: docRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now()
                })
            })

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: docRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now()
                })
            })
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div className='addUser'>
            <form action="" onSubmit={handleSearchUser}>
                <input type="text" placeholder='Username' name='username'/>
                <button type='submit'>Search</button>
            </form>
            {users && users.map((user) => (<div className="user" key={user.data().id}>
                <div className="detail">
                    <img src={user.data().avatar || userProfile} alt="" />
                    <span>{user.data().username}</span>
                </div>
                <button onClick={() => handleAddUser(user)} disabled={user.data().username === currentUser.username ? true : false}>Add User</button>
            </div>))}
            {
                classNameAdded && <div className={classNameAdded ? 'userNotFound' : ""}>User not found...</div>
            }
        </div>
    )
}
export default AddUser;
