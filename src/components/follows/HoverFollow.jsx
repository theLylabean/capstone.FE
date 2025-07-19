import { useState } from "react";
import { getFollowStatus, followUser, unfollowUser } from "../../api/followsIndex.js";

const HoverFollow = ({ targetUserId, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFollowing, setIsFollowing] = useState(null); // null means not loaded
    const [isLoading, setIsLoading] = useState(false);

    const handleMouseEnter = async () => {
        setIsHovered(true);
        if (isFollowing !== null) return;
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await getFollowStatus(targetUserId);
            setIsFollowing(res);
        } catch (error) {
            console.error('Error checking follow status: ', error);
        }
    }

    const handleFollow = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await followUser(targetUserId);
            setIsFollowing(true);
        } catch (error) {
            console.error('Error following user: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleUnfollow = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await unfollowUser(targetUserId);
            setIsFollowing(false);
        } catch (error) {
            console.error('Error unfollowing user: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={() => setIsHovered(false)}>
                {children}
                {isHovered && isFollowing !== null && (
                    <button 
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    disabled={isLoading}
                    >
                        {isLoading 
                            ? 'Loading...'
                            : isFollowing 
                            ? 'Unfollow' 
                            : 'Follow'}
                    </button>
                )}
            </div>
        </>
    )
}

export default HoverFollow;