import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/usersIndex";


const Register = () => {
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
        if (!password !== confirmPassword) {
            setSignupError('Passwords do not match.');
            return;
        }
        try {
            const res = await createUser();
            if (res.token) {
                localStorage.setItem('token', res.token);
                setToken(res.token);
                setUser(res);
                navigate('/account');
            } else {
                setLoginError(response.message || '** Invalid username or password **')
            }
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
                                value={createUser.first_name}
                                onChange={handleChange}
                                placeholder='Enter First Name Here'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;