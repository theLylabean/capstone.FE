import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/usersIndex";
import logo from '../../images/logo.png';
import "../../css/Register.css";


const Register = ({ setToken, setCurrentUser }) => {
    const navigate = useNavigate();
    const [signupError, setSignupError] = useState('');
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setNewUser(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignupError('');

        const { first_name, last_name, email, username, password, confirmPassword } = newUser;
        if (!first_name || !last_name || !email || !username || !password || !confirmPassword) {
            setSignupError('Please fill out all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setSignupError('Passwords do not match.');
            return;
        }
        try {
            const { confirmPassword, ...userData } = newUser;
            const res = await createUser(userData);
            if (res.token) {
                localStorage.setItem('token', res.token);
                setToken(res.token);
                navigate('/account');
            } else {
                setSignupError(res.message || '** Invalid username or password **')
            }
        } catch (error) {
            console.error('Register error.', error.message);
            setSignupError('Register new user failed. Please try again.');
        }
    }

    return (
        <>
            <div className='register-header-container'>
                <div className='register-logo-container'>
                    <img src={logo} alt='Logo' />
                </div>
                <h2>
                    <u>Sign Up!</u>
                </h2>
                <div className='register-rainbow-line' />
            </div>
            <div className='register-form-container'>
                <form className='register-form-columns' onSubmit={handleSubmit}>
                    <div className='register-form-row'>
                        <div className='register-form-field'>
                            <label><u>First Name</u>:&nbsp;</label>
                            <input 
                                type='text'
                                name='first_name'
                                value={newUser.first_name}
                                onChange={handleChange}
                                placeholder='Enter First Name Here'
                            />
                        </div>
                        <div className='register-form-field'>
                            <label><u>Last Name</u>:&nbsp;</label>
                            <input
                                type='text'
                                name='last_name'
                                value={newUser.last_name}
                                onChange={handleChange}
                                placeholder='Enter Last Name Here'
                            />
                        </div>
                    </div>
                    <div className='register-form-row'>
                        <div className='register-form-field'>
                            <label><u>Email</u>:&nbsp;</label>
                            <input
                                type='text'
                                name='email'
                                value={newUser.email}
                                onChange={handleChange}
                                placeholder='Enter Email Here'
                            />
                        </div>
                        <div className='register-form-field'>
                            <label><u>Username</u>:&nbsp;</label>
                            <input
                                type='text'
                                name='username'
                                value={newUser.username}
                                onChange={handleChange}
                                placeholder='Enter Username Here'
                            />
                        </div>
                    </div>
                    <div className='register-form-row'>
                        <div className='register-form-field'>
                            <label><u>Password</u>:&nbsp;</label>
                            <input
                                type='password'
                                name='password'
                                value={newUser.password}
                                onChange={handleChange}
                                placeholder='Enter Password Here'
                            />
                        </div>
                        <div className='register-form-field'>
                            <label><u>Confirm Password</u>:&nbsp;</label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={newUser.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter Password Again'
                            />
                        </div>
                    </div>
                    <button 
                        type='submit'
                        // disabled={
                        //     !createUser.first_name ||
                        //     !createUser.last_name ||
                        //     !createUser.email ||
                        //     !createUser.username ||
                        //     !createUser.password ||
                        //     !createUser.confirmPassword
                        // }    
                    >
                        Create New User Account
                    </button>
                </form>
                <div className='error-container'>
                    { signupError && <p className='error-message'>{ signupError }</p> }
                </div>
            </div>
        </>
    )
}

export default Register;