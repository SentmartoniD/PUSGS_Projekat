import { useEffect, useState } from "react";
import { GetRegisteredUser } from "../../services/RegisterService";

function Profile() {
    const [user, setUser] = useState([]);
    const [imageDisplayed, setImageDisplayed] = useState();
    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await GetRegisteredUser();
                console.log(resp);
                setUser(JSON.parse(resp.data));
                console.log("this is the data in  my user state")
                console.log(user);
            }
            catch (err) {
                if (!err?.response)
                    console.log("No server response");
                else
                    console.log(JSON.stringify(err.response.data));
            }
        }
        getUser();
        /* getUser().then(
             setImageDisplayed(atob(user.image))
         );*/
    }, [])



    return (
        <section className="section-profile" >
            <div className="row-div-profile" >
                <label htmlFor='username' className="label-profile" >Username :</label>
                <input type="text" className="input-profile" id='username' autoComplete='off' ></input>
                <label htmlFor='email' className="label-profile" >Email :</label>
                <input type="text" className="input-profile" id='email' autoComplete='off' ></input>
                <label htmlFor='firstname' className="label-profile" >First name :</label>
                <input type="text" className="input-profile" id='firstname' autoComplete='off' ></input>
                <label htmlFor='lastname' className="label-profile" >Last name :</label>
                <input type="text" className="input-profile" id='lastname' autoComplete='off' ></input>
            </div>
            <div className="row-div-profile" >
                <label htmlFor='dateofbirth' className="label-profile" >Date of birth : </label>
                <input id="dateofbirth" type="date" className="input-profile" autoComplete='off' ></input>
                <label htmlFor='address' className="label-profile" >Address : </label>
                <input id="address" type="text" className="input-profile" autoComplete='off' ></input>
                <label htmlFor='type' className="label-profile" >Type of user :</label>
                <select className="input-profile" name="usertype" id="type" autoComplete='off' >
                    <option value="">--Select--</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
            </div>
            <div className="row-div-profile">
                <img src={imageDisplayed} width={100} height={100} ></img>
            </div>
            <div className="row-div-profile" >
                <label htmlFor='password1' className="label-profile"  >Password :</label>
                <input id="password1" type="text" className="input-profile" autoComplete='off' ></input>
                <label htmlFor='password2' className="label-profile"  >Confirm password :</label>
                <input id="password2" type="text" className="input-profile" autoComplete='off' ></input>
            </div>
            <div className="row-div-profile" >
                <button className="button-9-profile" >Update</button>
            </div>
        </section>
    );
}

export default Profile;