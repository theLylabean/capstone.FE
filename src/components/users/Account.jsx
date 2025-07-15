import { useEffect } from "react";
import { getAccount } from "../../api/usersIndex.js";



const Account = ({ user, setUser }) => {

    useEffect(() => {
        const token = localStorage.getItem('token')
        const getAccountDetailsAPI = async () => {
            const res = await getAccount({token});
            setUser(res);
        }
        getAccountDetailsAPI();
    }, []);

    return (
        <>
            <div className='account-page-container'>
                <h1>
                    Welcome to your Account Page, {user?.first_name}!
                </h1>
                <div className='personal-info'>
                    <p><u>Name:</u>&nbsp;{user.first_name}&nbsp;{user.last_name}</p>
                    <p><u>Email:</u>&nbsp;{user.email}</p>
                    <p><u>Username:</u>&nbsp;{user.username}</p>
                </div>
            </div>
        </>
    )
}

export default Account;