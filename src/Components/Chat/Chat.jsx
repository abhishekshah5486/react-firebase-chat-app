import './Chat.css';
import userProfile from '../../Assets/Images/userProfile2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone, faVideo, faCircleInfo, faImage, faCamera, faMicrophone} from '@fortawesome/free-solid-svg-icons';
import {faFaceSmile} from '@fortawesome/free-regular-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import { useEffect, useRef, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({behavior: "smooth"});
    }, [])

    // useEffect(() => {
    //     const unSub = onSnapshot()
    // }, [])

    const handleEmoji = (e) => {
        console.log(e);
        setText(prev => prev + e.emoji);
        setOpen(false);
    }
    return (
        <div className="chat">
            <div className="top-section">
                <div className='chat-user-info'>
                    <img src={userProfile} alt="" />
                    <div className="texts">
                        <span>Divyanshu Kulhadiya</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="icons">
                  <FontAwesomeIcon icon={faPhone} />
                  <FontAwesomeIcon icon={faVideo} />
                  <FontAwesomeIcon icon={faCircleInfo} />
                </div>
            </div>
            <div className="center-section">
               <div className="message">
                <img src={userProfile} alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nihil ut, vel et fugit iure tenetur assumenda quo necessitatibus voluptatem aut at tempore possimus perspiciatis? Velit pariatur labore quibusdam temporibus?</p>
                    <span>1 min ago</span>
                </div>
               </div>
               <div className="message">
                <img src={userProfile} alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nihil ut, vel et fugit iure tenetur assumenda quo necessitatibus voluptatem aut at tempore possimus perspiciatis? Velit pariatur labore quibusdam temporibus?</p>
                    <span>1 min ago</span>
                </div>
               </div>
               <div className="message own">
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nihil ut, vel et fugit iure tenetur assumenda quo necessitatibus voluptatem aut at tempore possimus perspiciatis? Velit pariatur labore quibusdam temporibus?</p>
                    <span>1 min ago</span>
                </div>
               </div>
               <div className="message own">
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nihil ut, vel et fugit iure tenetur assumenda quo necessitatibus voluptatem aut at tempore possimus perspiciatis? Velit pariatur labore quibusdam temporibus?</p>
                    <span>1 min ago</span>
                </div>
               </div>
               <div className="message own">
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum nihil ut, vel et fugit iure tenetur assumenda quo necessitatibus voluptatem aut at tempore possimus perspiciatis? Velit pariatur labore quibusdam temporibus?</p>
                    <span>1 min ago</span>
                </div>
               </div>
               <div ref={endRef}></div>
            </div>
            <div className="bottom-section">
                <div className="btm-section-icons">
                    <FontAwesomeIcon icon={faImage} />
                    <FontAwesomeIcon icon={faCamera} />
                    <FontAwesomeIcon icon={faMicrophone} />
                </div>
                <input type="text" placeholder='Type a message' onChange={(e) => setText(e.target.value)} value={text}/>
                <div className="emoji">
                    <FontAwesomeIcon icon={faFaceSmile} onClick={ () => setOpen((prev) => !prev)}/>
                    <div className='emoji-picker'>
                    {open && <EmojiPicker open={open} onEmojiClick={handleEmoji} />}
                    </div>
                </div>
                <button className='sendBtn'>Send</button>
            </div>
        </div>
    )
}
export default Chat;