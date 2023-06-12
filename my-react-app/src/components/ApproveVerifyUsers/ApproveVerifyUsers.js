import { GetUsers } from "../../services/UserService";
import { useState, useEffect } from "react";
import { UpdateUserStatus } from "../../services/UserService";
import { SendEmail } from "../../services/EmailService";

function ApproveVerifyUsers() {
    const [users, setUsers] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const resp = await GetUsers();
                setUsers(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    alert("No server response");
                else
                    alert(JSON.stringify(err.response.data));
            }
        }
        getUsers();
    }, [trigger]);

    const handleStatus = async (userid, status) => {
        try {
            await UpdateUserStatus(userid, status);
            alert("Users status changed successfully!")
            if (status === "verify") {
                await SendEmail('Your account has been verified!');
            }
            else if (status === "unverify") {
                await SendEmail("Your verification has been denied!")
            }

        }
        catch (err) {
            if (!err?.response)
                alert("No server response, registration failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
        setTrigger(trigger + 1);
    }


    return (
        <section className="container" >
            <div className="box" >
                <h1 className="h1-apu" >Approve/Unaprove users:</h1>
                {users.length === 0 ? <></> :
                    <ul className="ul-items" >
                        {users.map((user) => (
                            user.approved === 1 ?
                                <li className="item" id={user.userId} >
                                    <img width={70} height={70} src={`data:image/png;base64,${user.imageFile}`} className="img-avu" alt="" ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                    <button onClick={() => handleStatus(user.userId, "approved")} className="button-avu" >Approve registration!</button>
                                    <button onClick={() => handleStatus(user.userId, "deny")} className="button-avu" >Deny registration!</button>
                                </li>
                                : null
                        ))}
                    </ul>
                }
            </div>
            <span>
            </span>
            <div className="box">
                <h1 className="h1-apu" >Approved users !</h1>
                {users.length === 0 ? <></> :
                    <ul className="ul-items">
                        {users.map((user) => (
                            user.approved === 0 ?
                                <li className="item2" id={user.userId + 10000} >
                                    <img width={70} height={70} src={`data:image/png;base64,${user.imageFile}`} className="img-avu" alt="" ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                </li>
                                : null
                        ))}
                    </ul>
                }
            </div>
            <div className="box">
                <h1 className="h1-apu" >Verify users :</h1>
                {users.length === 0 ? <></> :
                    <ul className="ul-items">
                        {users.map((user) => (
                            user.verified === 1 && user.userType === "seller" && user.approved === 0 ?
                                <li className="item" id={user.userId + 20000} >
                                    <img width={70} height={70} className="img-avu" alt="" src={`data:image/png;base64,${user.imageFile}`} ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                    <button onClick={() => handleStatus(user.userId, "verify")} className="button-avu" >Verify registration!</button>
                                    <button onClick={() => handleStatus(user.userId, "unverify")} className="button-avu" >Unverify registration!</button>
                                </li>
                                : null
                        ))}
                    </ul>
                }
            </div>
            <div className="box">
                <h1 className="h1-apu" >Verified users !</h1>
                {users.length === 0 ? <></> :
                    <ul className="ul-items" >
                        {users.map((user) => (
                            user.verified === 0 && user.userType === "seller" ?
                                <li className="item2" id={user.userId + 30000} >
                                    <img width={70} height={70} className="img-avu" src={`data:image/png;base64,${user.imageFile}`} alt="" ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                </li>
                                : null
                        ))}
                    </ul>
                }
            </div>
        </section>
    )
}

export default ApproveVerifyUsers;