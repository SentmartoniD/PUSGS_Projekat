import { Link, Outlet } from "react-router-dom";
import './Dashboard.css'

function Dashboard() {

    return (
        <>
            <nav className="Nav" >
                <ul >
                    <li className="ListItem" >
                        <Link to={"/home/profile"} className="Link" >Profile</Link>
                    </li>
                    <li className="ListItem">
                        ide is kell egy link
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    )

}



export default Dashboard;