import './App.css';
import './firebase-chat-app.css';
import List from './Components/List'
import Detail from './Components/Detail';
import Chat from './Components/Chat';
import Login from './Components/Login';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './lib/firebase';
import { useEffect } from 'react';
import useUserStore from './lib/userStore';
import LoadingSpinner from './Components/LoadingSpinner';


const auth = getAuth(app);
function App() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async user => {
      await fetchUserInfo(user);
    })
    return () => {
      unSub();
    }
  }, [])
  
  if (isLoading) return (<LoadingSpinner/>)
  return (
    <div className={`firebase-chat-app ${currentUser ? 'logged-in' : 'logged-out'}`}>
      {
        currentUser ? (
        <>
          <List/>
          <Chat/>
          <Detail signOut={signOut} auth={auth}/>
        </>
        ) : (
        <Login/>
      )}
    </div>
  );
}

export default App;
