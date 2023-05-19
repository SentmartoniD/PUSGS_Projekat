import { useEffect, useState } from "react";
import { GetRegisteredUser, UpdateUser } from "../../services/UserService";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USERNAME_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,20}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~.]{1,20}@[a-zA-Z0-9-]{1,20}\.[a-zA-Z]{1,20}$/;
const FIRSTNAME_REGEX = /^[A-Z][a-zA-Z]{3,20}$/;
const LASTNAME_REGEX = /^[A-Z][a-zA-Z]{3,20}$/;
const ADDRESS_REGEX = /^[A-Z][a-zA-Z0-9 ]{3,15},[ ]?[A-Z][a-zA-Z]{3,15},[ ]?[A-Z][a-zA-Z]{3,15}[ ][0-9]{1,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%?]).{8,20}$/;

function Profile() {
    const [trigger, setTrigger] = useState(0);
    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState(''); const [isUserNameValid, setIsUserNameValid] = useState(false); const [isUserNameFocus, setIsUserNameFocus] = useState(false);
    const [email, setEmail] = useState(''); const [isEmailValid, setIsEmailValid] = useState(false); const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [firstName, setFirstName] = useState(''); const [isFirstNameValid, setIsFirstNameValid] = useState(false); const [isFirstNameFocus, setIsFirstNameFocus] = useState(false);
    const [lastName, setLastName] = useState(''); const [isLastNameValid, setIsLastNameValid] = useState(false); const [isLastNameFocus, setIsLastNameFocus] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(''); const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false);
    const [address, setAddress] = useState(''); const [isAddressValid, setIsAdrressValid] = useState(false); const [isAddressFocus, setIsAddressFocus] = useState(false);
    const [userType, setUserType] = useState(''); const [isUserTypeValid, setIsUserTypeValid] = useState(false);
    const [image, setImage] = useState(""); const [isImageValid, setIsImageValid] = useState(false);
    const [password, setPassword] = useState(''); const [isPasswordValid, setIsPasswordValid] = useState(false); const [isPasswordFocus, setIsPasswordFocus] = useState(false);
    const [matchPassword, setMatchPassword] = useState(''); const [isMatchPasswordValid, setIsMatchPasswordValid] = useState(''); const [isMatchPasswordFocus, setIsMatchPasswordFocus] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await GetRegisteredUser();
                console.log("this is the response");
                console.log(resp);
                setUser(resp.data);
                console.log(atob(resp.data.image));
                console.log(resp.data.userType);
            }
            catch (err) {
                if (!err?.response)
                    console.log("No server response");
                else
                    console.log(JSON.stringify(err.response.data));
            }
        }
        getUser();
    }, [trigger]);
    useEffect(() => {
        setIsUserNameValid(USERNAME_REGEX.test(userName));
    }, [userName])
    useEffect(() => {
        setIsEmailValid(EMAIL_REGEX.test(email));
    }, [email])
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
        setIsAdrressValid(ADDRESS_REGEX.test(address));
    }, [address])
    useEffect(() => {
        setIsUserTypeValid(userType === '' ? false : true);
    }, [userType])
    useEffect(() => {
        setIsImageValid(image ? true : false);
        console.log(image)
    }, [image])
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setIsPasswordValid(result);
        const match = password === matchPassword;
        setIsMatchPasswordValid(match);
    }, [password, matchPassword])

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(user.userId)
        if (userName === "" && email === "" && firstName === "" && lastName === "" && dateOfBirth === "" &&
            address === "" && userType === "" && image === "" && password === "" && matchPassword === "") {
            alert("Your profile wont be updated, you didnt change any information!")
            return;
        }
        if (setIsUserNameValid === false && userName != "") {
            alert("The username is not in a valid format!");
            return;
        }

        const imageString = btoa(image);
        try {
            const response = await UpdateUser(user.userId, userName, email, firstName, lastName, dateOfBirth, address, userType, imageString, password);
            console.log(response.data);
            alert("User updated successfully!")
            setTrigger(trigger + 1);
        }
        catch (err) {
            if (!err?.response)
                alert("No server response, registration failed!");
            else
                alert(JSON.stringify(err.response.data));
        }
        console.log("vege!")
    }

    return (
        <section className="section-profile">
            <h1 className='h1-register-profile' >Update your profile!</h1>
            <form className="form-control-1-register-input" >
                <label htmlFor='username' >Username :
                    <FontAwesomeIcon icon={faCheck} className={isUserNameValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isUserNameValid || !userName ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' defaultValue={user.username} onChange={(e) => setUserName(e.target.value)} onFocus={() => setIsUserNameFocus(true)} onBlur={() => setIsUserNameFocus(false)}
                    id='username' aria-invalid={isUserNameValid ? "false" : "true"} aria-describedby='uidnode' className='input-profile' placeholder="If you leave this field empty, the username wont change!"
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
                <input type='text' autoComplete='off' defaultValue={user.email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setIsEmailFocus(true)} onBlur={() => setIsEmailFocus(false)}
                    id='email' aria-invalid={isEmailValid ? "false" : "true"} aria-describedby='emldnode' className='input-profile' placeholder="If you leave this field empty, the email wont change!"
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
                <input type='text' autoComplete='off' defaultValue={user.firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={() => setIsFirstNameFocus(true)} onBlur={() => setIsFirstNameFocus(false)}
                    id='firstname' aria-invalid={isFirstNameValid ? "false" : "true"} aria-describedby='fndnode' className='input-profile' placeholder="If you leave this field empty, the last name wont change!"
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
                <input type='text' autoComplete='off' defaultValue={user.lastName} onChange={(e) => setLastName(e.target.value)} onFocus={() => setIsLastNameFocus(true)} onBlur={() => setIsLastNameFocus(false)}
                    id='lastname' aria-invalid={isLastNameValid ? "false" : "true"} aria-describedby='lndnode' className='input-profile' placeholder="If you leave this field empty, the first name wont change!"
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
                <input id='dateofbirth' defaultValue={user.dateOfBirth} type='date' className='input-profile' onChange={(e) => setDateOfBirth(e.target.value)} ></input>
                <label htmlFor='address' >Address :
                    <FontAwesomeIcon icon={faCheck} className={isAddressValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isAddressValid || !address ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setAddress(e.target.value)} defaultValue={user.address} onFocus={() => setIsAddressFocus(true)} onBlur={() => setIsAddressFocus(false)}
                    id='address' aria-invalid={isAddressValid ? "false" : "true"} aria-describedby='addrnode' className='input-profile' placeholder="If you leave this field empty, the address wont change!"
                ></input>
                <p id='addrnode' className={isAddressFocus && address && !isAddressValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must start with the name of the country, then city and street!<br />
                    Example : Serbia, NoviSad, Telepska 2!
                </p>
                <label hidden={user.userType == "admin" ? true : false} htmlFor='type' >Type of user :
                    <FontAwesomeIcon icon={faCheck} className={isUserTypeValid ? "valid" : "hide"} />
                </label>
                <select hidden={user.userType == "admin" ? true : false} className='input-profile' name="usertype" id="type" autoComplete='off' defaultValue={user.userType} onChange={(e) => setUserType(e.target.value)} >
                    <option value="">--Select--</option>
                    <option value='buyer'>Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <label htmlFor='file' >Image :
                    <FontAwesomeIcon icon={faCheck} className={isImageValid ? "valid" : "hide"} />
                    {/* <FontAwesomeIcon icon={faTimes} className={isImageValid || image ? "hide" : "invalid"} />*/}
                </label>
                <div className='div-profile-img'>
                    <input id='file' type='file' accept='image/png' className='input-register-file' onChange={(e) => setImage(e.target.value)} ></input>
                    <img className='img-profile' width={70} height={70} ></img>
                </div>
                <label htmlFor='password1' >Password :
                    <FontAwesomeIcon icon={faCheck} className={isPasswordValid ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={isPasswordValid || !password ? "hide" : "invalid"} />
                </label>
                <input type='text' autoComplete='off' onChange={(e) => setPassword(e.target.value)} onFocus={() => setIsPasswordFocus(true)} onBlur={() => setIsPasswordFocus(false)}
                    id='password1' aria-invalid={isPasswordValid ? "false" : "true"} aria-describedby='psswnode' className='input-profile' placeholder="If you leave this field empty, the password wont change!"
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
                <input type='text' autoComplete='off' onChange={(e) => setMatchPassword(e.target.value)} onFocus={() => setIsMatchPasswordFocus(true)} onBlur={() => setIsMatchPasswordFocus(false)}
                    id='password2' aria-invalid={isMatchPasswordValid ? "false" : "true"} aria-describedby='mtchpsswnode' className='input-profile' placeholder="If you leave this field empty, the password wont change!"
                ></input>
                <p id='mtchpsswnode' className={isMatchPasswordFocus && matchPassword && !isMatchPasswordValid ? "instructions" : "offscreen"}  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the firts password input field!<br />
                </p>
                <div className="div-button-profile" >
                    <button className="button-9-profile" onClick={handleUpdateProfile} >Update your profile!</button>
                </div>
            </form>

        </section>
    );
}

export default Profile;