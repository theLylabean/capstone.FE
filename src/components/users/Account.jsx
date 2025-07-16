import '../../css/Account.css';

const Account = ({ currentUser }) => {

if (!currentUser) return <p>Loading your account info...</p>

    return (
        <>
            <div className='account-page-container'>
                <h1>
                    Welcome to your Account Page, {currentUser?.firstName}!
                </h1>
                <div className='personal-info'>
                    <p><u>Name</u>:&nbsp;{currentUser?.firstName}&nbsp;{currentUser?.lastName}</p>
                    <p><u>Email</u>:&nbsp;{currentUser?.email}</p>
                    <p><u>Username</u>:&nbsp;{currentUser?.username}</p>
                </div>
            </div>
        </>
    )
}

export default Account;