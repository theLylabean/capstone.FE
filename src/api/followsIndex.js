const baseUrl = 'http://localhost:3000/api';

const getFollowing = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/follows/${id}/following`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw new Error (`Failed to fetch following list: ${res.status}`)
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const getFollowers = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/follows/${id}/followers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw new Error (`Failed to fetch following lists: ${res.status}`)
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

const getFollowStatus = async (targetUserId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/follows/${targetUserId}/status`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch follow status: ${res.status}`);
        }
        const result = await res.json();
        return result.isFollowing;
    } catch (error) {
        console.error('Error in getFollowStatus: ', error);
        throw error;
    }
}

const followUser = async (targetUserId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/follows/${targetUserId}/follow`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(targetUserId, token);
        if (!res.ok) {
            throw new Error(`Failed to follow user: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to follow user.', error);
        throw error;
    }
}

const unfollowUser = async (targetUserId) => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/follows/${targetUserId}/unfollow`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to unfollow user: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to unfollow user.', error);
        throw error;
    }
}

export { getFollowing, getFollowers, getFollowStatus, followUser, unfollowUser }