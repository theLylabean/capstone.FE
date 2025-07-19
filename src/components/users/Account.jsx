import { useEffect } from "react";
import { getAccount } from "../../api/usersIndex.js";
import Follows from "../follows/Follows.jsx";
import '../../css/Account.css';

const Account = ({ currentUser, setCurrentUser }) => {
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        const getAccountDetailsAPI = async () => {
            try {
                const res = await getAccount();
                setCurrentUser(res)
            } catch (error) {
                console.error('getAccount failed: ', error.message);
            }
        };

    getAccountDetailsAPI();
}, []);

if (!currentUser) return <p>Loading your account info...</p>

    return (
        <>
            <div className='account-page-container'>
                <h1>
                    Welcome to your Account Page, {currentUser?.firstName}!
                </h1>
                <div className='personal-info-container'>
                    <p className='personal-info-card'><u>Name</u>:&nbsp;{currentUser?.firstName}&nbsp;{currentUser?.lastName}</p>
                    <p className='personal-info-card'><u>Email</u>:&nbsp;{currentUser?.email}</p>
                    <p className='personal-info-card'><u>Username</u>:&nbsp;{currentUser?.username}</p>
                </div>
            </div>
            <br />
            <div>
                <Follows />
            </div>
        </>
    )
}

export default Account;