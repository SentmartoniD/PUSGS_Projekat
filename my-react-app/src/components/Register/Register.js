import { useEffect, useState } from 'react';
import './Register.css'

const USERNAME_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]{1,20}@[a-zA-Z0-9-]{1,20}\.[a-zA-Z]{1,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?]).{8,20}$/;
const FIRSTNAME_REGEX = /[a-zA-Z]{3,20}/;
const LASTNAME_REGEX = /[a-zA-Z]{3,20}/;
const ADDRESS_REGEX = /[a-zA-Z ]{3,30}/;

function Register() {
    const [userName, setUserName] = useState(''); const [isUserNameValid, setIsUserNameValid] = useState(false);
    const [email, setEmail] = useState(''); const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState(''); const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [firstName, setFirstName] = useState(''); const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [lastName, setLastName] = useState(''); const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [address, setAddress] = useState(''); const [isAddressValid, setIsAdrressValid] = useState(false);

    const [matchPassword, setMatchPassword] = useState(''); const [isMatchPasswordValid, setIsMatchPasswordValid] = useState('');

    useEffect(() => {
        setIsUserNameValid(USERNAME_REGEX.test(userName));
    }, [userName])
    useEffect(() => {
        setIsEmailValid(USERNAME_REGEX.test(email));
    }, [email])
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setIsPasswordValid(result);
        const match = password === matchPassword;
        setIsMatchPasswordValid(match);
    }, [password, matchPassword])


    return (
        <section>
            <h1>Register</h1>
            <form>
                <label>Username :</label>
                <input type='text' autoComplete='off' onChange={(e) => setUserName(e.target.value)} ></input>
                <p>Username must start with a letter.<br />
                    Must be bethween 3 to 20 characters long.<br />
                    Can contain only letters, - or _ .
                </p>
            </form>
        </section>
    );
}

export default Register;