import { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "../../api/followsIndex";
import { jwtDecode } from "jwt-decode";
import '../../css/Account.css';


const Follows = () => {
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).id : null;

    useEffect(() => {
        const fetchFollows = async () => {
            try {
                const followingData = await getFollowing(userId);
                const followersData = await getFollowers(userId);
                setFollowing(followingData);
                setFollowers(followersData);
            } catch (error) {
                console.error('Failed to load follow data: ', error);
            }
        }
        fetchFollows();
    }, [userId])

    return (
        <>
            <div className='follow-container'>
                <div className='follow-list'>
                    <h2><u><b>Following</b></u></h2>
                    <ul>
                        {following.map((user) => (
                            <li key={user.id}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='follow-list'>
                    <h2><u><b>Followers</b></u></h2>
                    <ul>
                        {followers.map((user) => (
                            <li key={user.id}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Follows;