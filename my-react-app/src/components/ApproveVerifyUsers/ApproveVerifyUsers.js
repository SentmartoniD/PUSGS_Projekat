import { GetUsers } from "../../services/UserService";
import { useState, useEffect } from "react";
import { UpdateUserStatus } from "../../services/UserService";
import emailjs from "@emailjs/browser"

function ApproveVerifyUsers() {
    const [users, setUsers] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const resp = await GetUsers();
                console.log("this is the response");
                console.log(resp);
                setUsers(resp.data);
            }
            catch (err) {
                if (!err?.response)
                    console.log("No server response");
                else
                    console.log(JSON.stringify(err.response.data));
            }
        }
        getUsers();
    }, [trigger]);

    const handleStatus = async (userid, status) => {
        try {
            const response = await UpdateUserStatus(userid, status);
            alert("Users status changed successfully!")
            if (status === "verify") {
                const emailData = {
                    service_id: 'YOUR_SERVICE_ID',
                    template_id: 'YOUR_TEMPLATE_ID',
                    user_id: 'YOUR_USER_ID',
                    template_params: {
                        to_email: 'example@gmail.com',
                        subject: 'Hello from React',
                        message: 'This is the email message.',
                    },
                    access_token: 'YOUR_ACCESS_TOKEN',
                };

            }
            else if (status === "unverify") {
                const data = {
                    user_name: 'Deni',
                    user_email: 'denessentmartoni@gmail.com',
                    message: 'Your verification has been denied!',
                };
                emailjs.send('service_jsr3vhk', 'template_u2q27tw', data, 's8B1zFuerOqESsscI')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    })
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
                                    <img width={50} height={50} ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                    <button onClick={() => handleStatus(user.userId, "approved")} >Approve registration!</button>
                                    <button onClick={() => handleStatus(user.userId, "deny")} >Deny registration!</button>
                                </li>
                                : <></>
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
                                <li className="item" id={user.userId + 1000} >
                                    <img width={50} height={50} ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                </li>
                                : <></>
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
                                <li className="item" id={user.userId + 2000} >
                                    <img width={50} height={50} ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                    <button onClick={() => handleStatus(user.userId, "verify")} >Verify registration!</button>
                                    <button onClick={() => handleStatus(user.userId, "unverify")} >Unverify registration!</button>
                                </li>
                                : <></>
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
                                <li className="item" id={user.userId + 3000} >
                                    <img width={50} height={50} ></img>
                                    <label className="label-avu" >Username : {user.username}</label>
                                    <label className="label-avu" >Email : {user.email}</label>
                                    <label className="label-avu" >First name : {user.firstName}</label>
                                    <label className="label-avu" >Last name : {user.lastName}</label>
                                    <label className="label-avu" >Date of birth : {user.dateOfBirth}</label>
                                    <label className="label-avu" >Address : {user.address}</label>
                                    <label className="label-avu" >User type : {user.userType}</label>
                                </li>
                                : <></>
                        ))}
                    </ul>
                }
            </div>
        </section>
    )
}

export default ApproveVerifyUsers;