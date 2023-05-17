import { Link, Outlet } from "react-router-dom";
import './Dashboard.css'
import "../Profile/Profile.css";

function Dashboard() {

    return (
        <>
            <nav className="Nav" >
                <ul >
                    <li className="ListItem" >
                        <Link to={"/home/profile"} className="Link" >Profile</Link>
                    </li>
                    <li className="ListItem" >
                        <Link to={"/home/aprove-verify-users"} >Aprove/Verify users</Link>
                    </li>
                    <li className="ListItem">
                        <Link to={"/home/articles"} className="Link" >Add new articles</Link>
                    </li>
                    <li className="ListItem">
                        <Link to={"/"} className="Link" >Sign out!</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    )

}



export default Dashboard;