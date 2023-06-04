import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import './Login.css'
import { LoginUser } from "../../services/UserService";

//REGEX FOR THE INPUT EMAIL AND PASSWORD
const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]{1,20}@[a-zA-Z0-9-]{1,20}\.[a-zA-Z]{1,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?]).{8,20}$/;

function Login() {
    const [email, setEmail] = useState(''); const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState(''); const [isPasswordValid, setIsPasswordValid] = useState(false);

    //EVERYTIME THE INPUT EMAIL CHANGES THE REGEX TESTS THE INPUT AND SETS isEmailValid
    useEffect(() => {
        setIsEmailValid(EMAIL_REGEX.test(email));
    }, [email])
    //EVERYTIME THE INPUT PASSWORD CHANGES THE REGEX TESTS THE INPUT AND SETS isPasswordValid
    useEffect(() => {
        setIsPasswordValid(PWD_REGEX.test(password));
    }, [password])

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/home');
    };

    //IF isEmailValid AND isPasswordValid ARE TRUE THEN THE VALUES ARE SENT TO THE SERVER OTHERWISE ERROR
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isEmailValid)
            alert("The email is not in a valid format!");
        if (!isPasswordValid)
            alert("The password is not in a valid format!")
        if (isPasswordValid && isEmailValid) {
            try {
                const response = await LoginUser(email, password);
                console.log(response.data)
                const token = response.data;
                //HA A USER SELLER AKO KI KELL MUTATNI EGY ABLAKON AZ ALAPOTAT
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('articles', JSON.stringify([]));
                const [header, payload, signature] = token.split('.');
                const decodedPayload = atob(payload);
                const payloadObj = JSON.parse(decodedPayload);
                console.log(payloadObj["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
                console.log(payloadObj["verified"]);

                navigateToHome();
            } catch (err) {
                if (!err?.response)
                    alert("No server response, login failed!");
                else
                    alert(JSON.stringify(err.response.data));
            }

        }
    }
    return (
        <section className="section-login" >
            <h1 className="h1-login">Login</h1>
            <form>
                <div className="form-control-login" >
                    <label className="label-login-1" htmlFor="inputEmail" >Email: </label>
                    <input className="input-login-1" id="inputEmail" type="text" onChange={(e) => setEmail(e.target.value)} ></input>
                    <label className="label-login-2" htmlFor="inputPassword" >Password:  </label>
                    <input className="input-login-2" id="inputPassword" type="text" onChange={(e) => setPassword(e.target.value)} ></input>
                </div>
                <div className="form-control-2-login" >
                    <button className="button-9-login" onClick={handleLogin} >Sign In</button>
                    <p className="p-color-login" >Need an account?<br />
                        <span><Link className="p-color-login" to={"/register"}>Sign Up</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Login;