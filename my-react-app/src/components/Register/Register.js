import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RegisterUser, UploadImageForUser } from '../../services/UserService';
import './Register.css'

//REGEX FOR USERNAME, EMAIL, PASSWORD, FIRSTNAME, LASTNAME AND ADDRESS
const USERNAME_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]{1,20}@[a-zA-Z0-9-]{1,20}\.[a-zA-Z]{1,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?]).{8,20}$/;
const FIRSTNAME_REGEX = /^[A-Z][a-zA-Z]{3,20}$/;
const LASTNAME_REGEX = /^[A-Z][a-zA-Z]{3,20}$/;
const ADDRESS_REGEX = /^[A-Z][a-zA-Z0-9 ]{2,15},[ ]?[A-Z][a-zA-Z ]{2,15},[ ]?[A-Z][a-zA-Z ]{2,15}[ ][0-9]{1,4}$/;

function Register() {

    //USESTATES FOR THE INPUT FIELDS
    const [userName, setUserName] = useState(''); const [isUserNameValid, setIsUserNameValid] = useState(false); const [isUserNameFocus, setIsUserNameFocus] = useState(false);
    const [email, setEmail] = useState(''); const [isEmailValid, setIsEmailValid] = useState(false); const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [firstName, setFirstName] = useState(''); const [isFirstNameValid, setIsFirstNameValid] = useState(false); const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
    const [lastName, setLastName] = useState(''); const [isLastNameValid, setIsLastNameValid] = useState(false); const [isLastNameFocus, setIsLastNameFocus] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(''); const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false);
    const [userType, setUserType] = useState(''); const [isUserTypeValid, setIsUserTypeValid] = useState(false);
    const [image, setImage] = useState(""); const [isImageValid, setIsImageValid] = useState(false);
    const [file, setFile] = useState();
    const [address, setAddress] = useState(''); const [isAddressValid, setIsAdrressValid] = useState(false); const [isAddressFocus, setIsAddressFocus] = useState(false);
    const [password, setPassword] = useState(''); const [isPasswordValid, setIsPasswordValid] = useState(false); const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [matchPassword, setMatchPassword] = useState(''); const [isMatchPasswordValid, setIsMatchPasswordValid] = useState(''); const [isMatchPasswordFocus, setIsMatchPasswordFocus] = useState(false);

    //VALIDATION OF THE INPUTS
    useEffect(() => {
        setIsUserNameValid(USERNAME_REGEX.test(userName));
    }, [userName])
    useEffect(() => {
        setIsEmailValid(EMAIL_REGEX.test(email));
    }, [email])
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setIsPasswordValid(result);
        const match = password === matchPassword;
        setIsMatchPasswordValid(match);
    }, [password, matchPassword])
    useEffect(() => {
        setIsFirstNameValid(FIRSTNAME_REGEX.test(firstName));
    }, [firstName])
    useEffect(() => {
        setIsLastNameValid(LASTNAME_REGEX.test(lastName));
    }, [lastName])
    useEffect(() => {
        setIsDateOfBirthValid(dateOfBirth ? true : false);
    }, [dateOfBirth])
    useEffect(() => {
        setIsUserTypeValid(userType === '' ? false : true);
    }, [userType])
    useEffect(() => {
        setIsImageValid(image ? true : false);
    }, [image])
    useEffect(() => {
        setIsAdrressValid(ADDRESS_REGEX.test(address));
    }, [address])

    const navigate = useNavigate()
    const navigateToLogin = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log(userName, email, firstName, lastName, dateOfBirth, address, userType, file, password)
            await RegisterUser(userName, email, firstName, lastName, dateOfBirth, address, userType, password);
            await UploadImageForUser(file, email);
            alert("You have successfully registered!")
            navigateToLogin();
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, registration failed!");
            else
                alert(JSON.stringify(err.response.data));
        }

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImage(URL.createObjectURL(file));
        console.log(file.type)
    }

    return (
        <section className='section-register'>
            <h1 className='h1-register' >Register</h1>
            <form className='form-control-1-register' onSubmit={handleSubmit} >
                <label htmlFor='username' >Username :
                    <FontAwesomeIcon icon={faCheck} className={isUserNameValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isUserNameValid || !userName ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setUserName(e.target.value)} required onFocus={() => setIsUserNameFocus(true)} onBlur={() => setIsUserNameFocus(false)}
                    id='username' aria-invalid={isUserNameValid ? "false" : "true"} aria-describedby='uidnode' className='input-register'
                ></input>
                <p id='uidnode' className={isUserNameFocus && userName && !isUserNameValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Username must start with a letter!<br />
                    Must be bethween 4 to 22 characters long!<br />
                    Can contain only letters,numbers , _ or - !
                </p>
                <label htmlFor='email' >Email :
                    <FontAwesomeIcon icon={faCheck} className={isEmailValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isEmailValid || !email ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setEmail(e.target.value)} required onFocus={() => setIsEmailFocus(true)} onBlur={() => setIsEmailFocus(false)}
                    id='email' aria-invalid={isEmailValid ? "false" : "true"} aria-describedby='emldnode' className='input-register'
                ></input>
                <p id='emldnode' className={isEmailFocus && email && !isEmailValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email must be a regular email adrress!<br />
                    Example: example@example.com!
                </p>
                <label htmlFor='firstname' >First name :
                    <FontAwesomeIcon icon={faCheck} className={isFirstNameValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isFirstNameValid || !firstName ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setFirstName(e.target.value)} required onFocus={() => setIsFirstNameFocus(true)} onBlur={() => setIsFirstNameFocus(false)}
                    id='firstname' aria-invalid={isFirstNameValid ? "false" : "true"} aria-describedby='fndnode' className='input-register'
                ></input>
                <p id='fndnode' className={isFirstNameFocus && firstName && !isFirstNameValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with a capital letter!<br />
                    Can contain only letters!<br />
                    Must be bethween 4 to 20 letters long!
                </p>
                <label htmlFor='lastname' >Last name :
                    <FontAwesomeIcon icon={faCheck} className={isLastNameValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isLastNameValid || !lastName ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setLastName(e.target.value)} required onFocus={() => setIsLastNameFocus(true)} onBlur={() => setIsLastNameFocus(false)}
                    id='lastname' aria-invalid={isLastNameValid ? "false" : "true"} aria-describedby='lndnode' className='input-register'
                ></input>
                <p id='lndnode' className={isLastNameFocus && lastName && !isLastNameValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with a capital letter!<br />
                    Can contain only letters!<br />
                    Must be bethween 4 to 20 letters long!
                </p>
                <label htmlFor='dateofbirth' >Date of birth :
                    <FontAwesomeIcon icon={faCheck} className={isDateOfBirthValid ? "valid" : "hide"} />
                    {/* <FontAwesomeIcon icon={faTimes} className={isDateOfBirthValid || dateOfBirth ? "hide" : "invalid"} />*/}
                </label>
                <input id='dateofbirth' type='date' className='input-register' onChange={(e) => setDateOfBirth(e.target.value)} ></input>
                <label htmlFor='address' >Address :
                    <FontAwesomeIcon icon={faCheck} className={isAddressValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isAddressValid || !address ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setAddress(e.target.value)} required onFocus={() => setIsAddressFocus(true)} onBlur={() => setIsAddressFocus(false)}
                    id='address' aria-invalid={isAddressValid ? "false" : "true"} aria-describedby='addrnode' className='input-register'
                ></input>
                <p id='addrnode' className={isAddressFocus && address && !isAddressValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with the name of the country, then city and street!<br />
                    Example : Serbia, Novi Sad, Telepska 2!
                </p>
                <label htmlFor='type' >Type of user :
                    <FontAwesomeIcon icon={faCheck} className={isUserTypeValid ? "valid" : "hide"} />
                </label>
                <select className='input-register' name="usertype" id="type" autoComplete='off' required onChange={(e) => setUserType(e.target.value)} >
                    <option value="">--Select--</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <label htmlFor='file' >Image(png) :
                    <FontAwesomeIcon icon={faCheck} className={isImageValid ? "valid" : "hide"} />
                    {/* <FontAwesomeIcon icon={faTimes} className={isImageValid || image ? "hide" : "invalid"} />*/}
                </label>
                <div className='div-register-img'>
                    <input id='file' type='file' required accept='image/png' className='input-register-file' onChange={handleImageChange} ></input>
                    <img className='img-register' width={70} height={70} src={image} alt='' ></img>
                </div>
                <label htmlFor='password1' >Password :
                    <FontAwesomeIcon icon={faCheck} className={isPasswordValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isPasswordValid || !password ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setPassword(e.target.value)} required onFocus={() => setIsPasswordFocus(true)} onBlur={() => setIsPasswordFocus(false)}
                    id='password1' aria-invalid={isPasswordValid ? "false" : "true"} aria-describedby='psswnode' className='input-register'
                ></input>
                <p id='psswnode' className={isPasswordFocus && password && !isPasswordValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Password must contain atleast 1 lowercase letter,<br />
                    1 uppercase letter, 1 number and<br />
                    1 special character (!@#$%?)!<br />
                    Must be bethween 8 to 20 characters long!
                </p>
                <label htmlFor='password2' >Confirm password :
                    <FontAwesomeIcon icon={faCheck} className={isMatchPasswordValid && matchPassword ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isMatchPasswordValid || !matchPassword ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setMatchPassword(e.target.value)} required onFocus={() => setIsMatchPasswordFocus(true)} onBlur={() => setIsMatchPasswordFocus(false)}
                    id='password2' aria-invalid={isMatchPasswordValid ? "false" : "true"} aria-describedby='mtchpsswnode' className='input-register'
                ></input>
                <p id='mtchpsswnode' className={isMatchPasswordFocus && matchPassword && !isMatchPasswordValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the firts password input field!<br />
                </p>
                <button className='button-register'
                    disabled={!isUserNameValid || !isEmailValid || !isFirstNameValid || !isLastNameValid || !isDateOfBirthValid ||
                        !isAddressValid || !isImageValid || !isPasswordValid || !isMatchPasswordValid ? true : false}
                >Register</button>
                <div className="form-control-2-register" >
                    <p className='p-color-register' >Already have an account?<br />
                        <span><Link className='p-color-register' to={"/"}>Sign In</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
}

export default Register;