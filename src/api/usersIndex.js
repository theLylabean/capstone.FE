const baseUrl = 'http://localhost:3000/auth';

const createUser = async ({first_name, last_name, email, username, password}) => {
    try {
        const res = await fetch(`${baseUrl}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name, last_name, email, username, password })
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
    }
}

const getLogin = async (username, password) => {
    try {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const getAccount = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`${baseUrl}/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    if (!res.ok) {
        throw new Error(`Failed to fetch account details: ${res.status}`);
    }
    const result = await res.json();
    return result;
    } catch (error) {
    console.error(error.message);
    }
}

export { createUser, getLogin, getAccount }