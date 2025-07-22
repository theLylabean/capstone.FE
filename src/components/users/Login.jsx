import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogin } from '../../api/usersIndex';
import logo from '../../images/logo.png';
import "../../css/Login.css";

const Login = ({ setCurrentUser, setToken }) => {
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
                setCurrentUser(res.user);
                navigate('/account');
            } else {
                setLoginError(res.message || '** Invalid username or password **')
            }
        } catch (error) {
            console.error('Login error: ', error.message);
            setLoginError('Login failed. Please try again.');
        }
    }

    return (
        <>
            <div className='login-header-container'>
                <div className='login-logo-container'>
                    <img src={logo} alt='Logo' />
                </div>
                <h2>
                    <u>Login</u>
                </h2>
                <div className='login-rainbow-line' />
            </div>
            <div className='login-container'>
                <form className='login-form' onSubmit={handleLoginSubmit}>
                    <div className='login-username'>
                        <label><u>Username</u>:</label>
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
                        <label><u>Password</u>:</label>
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