import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import './Login.css'

const USERNAME_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?]).{8,20}$/;


function Login() {
    const [userName, setUserName] = useState(''); const [isUserNameValid, setIsUserNameValid] = useState(false);
    const [password, setPassword] = useState(''); const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        setIsUserNameValid(USERNAME_REGEX.test(userName));
    }, [userName])
    useEffect(() => {
        setIsPasswordValid(PWD_REGEX.test(password));
    }, [password])


    const handleLogin = () => {
        if (!isUserNameValid)
            alert("The username is not in a valid format!")
        if (!isPasswordValid)
            alert("The password is not in a valid format!")
        if (isPasswordValid && isUserNameValid) {
            //axios.post
            console.log("send it")
        }
    }
    return (
        <section>
            <h1>Login</h1>
            <form>
                <div className="form-control" >
                    <label htmlFor="inputUsername" >Username: </label>
                    <input id="inputUsername" type="text" onChange={(e) => setUserName(e.target.value)} ></input>
                    <label htmlFor="inputPassword" >Password:  </label>
                    <input id="inputPassword" type="text" onChange={(e) => setPassword(e.target.value)} ></input>
                </div>
                <div className="form-control-2" >
                    <button className="button-9" onClick={handleLogin} >Sign In</button>
                    <p>Need an account?<br />
                        <span><Link to={"/register"}>Sign Up</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Login;