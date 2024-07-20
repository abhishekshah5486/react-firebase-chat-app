import './Detail.css';
import userProfile from '../../Assets/Images/userProfile2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faDownload,  faCircleChevronDown, faCircleChevronUp} from '@fortawesome/free-solid-svg-icons';
import tempImage from '../../Assets/Images/userProfile.jpg';

const Detail = ({auth, signOut}) => {
    return (
        <div className="detail">
            <div className="detail-user-info">
                <img src={userProfile} alt="" />
                <h2 className='gradient-text'>Kushagra Srivastava</h2>
                <p>Lorem ipsum itle.</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <FontAwesomeIcon icon={faCircleChevronUp} />
                    </div>
                    <div className="title">
                        <span>Shared Photos</span>
                        <FontAwesomeIcon icon={faCircleChevronDown} />
                        <div className="photos">
                            <div className="photoItem">
                                <img src={tempImage} alt="" />
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div className="photoItem">
                                <img src={tempImage} alt="" />
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div className="photoItem">
                                <img src={tempImage} alt="" />
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div className="photoItem">
                                <img src={tempImage} alt="" />
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                            <div className="photoItem">
                                <img src={tempImage} alt="" />
                                <FontAwesomeIcon icon={faDownload} />
                            </div>
                        </div>
                    </div>
                    <div className="title">
                        <span>Privacy and Help</span>
                        <FontAwesomeIcon icon={faCircleChevronUp} />
                    </div>
                </div>
            </div>
            <button className='blockUserBtn'>Block User</button>
            <button className="logout" onClick={ () => signOut(auth) }>Logout</button>
        </div>
    )
}
export default Detail;