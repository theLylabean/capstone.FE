import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../../api/usersIndex';

const Login = ({ setUser, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            const res = await getLogin(username, password);
            if (res.token) {
                localStorage.setItem('token', res.token);
                setToken(res.token);
                setUser(res.user);
                navigate('/account');
            } else {
                setLoginError(response.message || '** Invalid username or password **')
            }
        } catch (error) {
            console.error('Login error: ', error.message);
            setLoginError('Login failed. Please try again.');
        }
    }

    return (
        <>
            <div className='login-container'>
                <div className='login-header-container'>
                    <h2>
                        Login
                    </h2>
                </div>
                <form onSubmit={handleLoginSubmit}>
                    <div className='login-username'>
                        <label>Username:</label>
                        &nbsp;
                        <input
                            className='form-username'
                            type='text'
                            required
                            name='username'
                            value={username}
                            onChange={ e => setUsername(e.target.value) }
                        />
                    </div>
                    <br />
                    <div className='login-password'>
                        <label>Password:</label>
                        &nbsp;
                        <input
                            className='form-password'
                            type='password'
                            required
                            name='password'
                            value={password}
                            onChange={ e => setPassword(e.target.value) }
                        />
                        {loginError && <p>{loginError}</p>}
                        <br />
                        <button
                            className='submit-button'
                            type='submit'
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;