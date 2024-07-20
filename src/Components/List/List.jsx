import './List.css';
import UserInfo from './UserInfo';
import ChatList from './ChatList';


const List = () => {
    return (
        <div className="list">
            <UserInfo />
            <ChatList />
        </div>
    )
}
export default List;