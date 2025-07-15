import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/usersIndex";


const Register = ({ setToken, setUser }) => {
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
        console.log(newUser);
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
            console.log('Server response: ', res)
            if (res.token) {
                localStorage.setItem('token', res.token);
                setToken(res.token);
                setUser(res.user);
                navigate('/account');
            } else {
                setSignupError(res.message || '** Invalid username or password **')
            }
            console.log(setToken);
            console.log(res.token);
        } catch (error) {
            console.error('Register error.', error.message);
            setSignupError('Register new user failed. Please try again.');
        }
    }

    return (
        <>
            <div className='form-container'>
                <form className='form-columns' onSubmit={handleSubmit}>
                    <div className='form-row'>
                        <div className='form-field'>
                            <label>First Name:&nbsp;</label>
                            <input 
                                type='text'
                                name='first_name'
                                value={newUser.first_name}
                                onChange={handleChange}
                                placeholder='Enter First Name Here'
                            />
                        </div>
                        <div className='form-field'>
                            <label>Last Name:&nbsp;</label>
                            <input
                                type='text'
                                name='last_name'
                                value={newUser.last_name}
                                onChange={handleChange}
                                placeholder='Enter Last Name Here'
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-field'>
                            <label>Email:&nbsp;</label>
                            <input
                                type='text'
                                name='email'
                                value={newUser.email}
                                onChange={handleChange}
                                placeholder='Enter Email Here'
                            />
                        </div>
                        <div className='form-field'>
                            <label>Username:&nbsp;</label>
                            <input
                                type='text'
                                name='username'
                                value={newUser.username}
                                onChange={handleChange}
                                placeholder='Enter Username Here'
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-field'>
                            <label>Password:&nbsp;</label>
                            <input
                                type='password'
                                name='password'
                                value={newUser.password}
                                onChange={handleChange}
                                placeholder='Enter Password Here'
                            />
                        </div>
                        <div className='form-field'>
                            <label>Confirm Password:&nbsp;</label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={newUser.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter Password Again'
                            />
                        </div>
                    </div>
                    <div className='form-button'>
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
                    </div>
                </form>
                <div className='error-container'>
                    { signupError && <p className='error-message'>{ signupError }</p> }
                </div>
            </div>
        </>
    )
}

export default Register;