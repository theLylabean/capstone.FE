const baseUrl = 'http://localhost:3000/api';

const getFollowing = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/:id/followers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            throw newError (`Failed to fetch following list: ${res.status}`)
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

const getFollowers = async () => {
    const token = localStorage.getItem('token');
}