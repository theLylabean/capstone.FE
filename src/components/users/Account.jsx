import { useEffect } from "react";
import { getAccount } from "../../api/usersIndex.js";

const Account = ({ currentUser }) => {
//     useEffect(() => {
//         if (!token) return;
//         const getAccountDetailsAPI = async () => {
//             try {
//                 const res = await getAccount();
//                 setCurrentUser(res)
//             } catch (error) {
//                 console.error('getAccount failed: ', error.message);
//             }
//         };

//     getAccountDetailsAPI();
// }, [token]);

const Account = ({ user, setUser }) => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        const getAccountDetailsAPI = async () => {
            const res = await getAccount({token});
            setUser(res);
        }
        getAccountDetailsAPI();
    }, []);

if (!currentUser) return <p>Loading your account info...</p>

    return (
        <>
            <div className='account-page-container'>
                <h1>
                    Welcome to your Account Page, {currentUser?.firstName}!
                </h1>
                <div className='personal-info'>
                    <p><u>Name:</u>&nbsp;{currentUser?.firstName}&nbsp;{currentUser?.lastName}</p>
                    <p><u>Email:</u>&nbsp;{currentUser?.email}</p>
                    <p><u>Username:</u>&nbsp;{currentUser?.username}</p>
                </div>
            </div>
        </>
    )
}

export default Account;