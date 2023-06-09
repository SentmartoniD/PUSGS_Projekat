import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import './Dashboard.css'
import "../Profile/Profile.css";
import "../ApproveVerifyUsers/ApproveVerifyUsers.css";
import "../Articles/Articles.css"
import "../ArticleList/ArticleList.css"
import "../MyCart/MyCart.css"
import "../AllOrders/AllOrders.css"

function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        const logoutTimer = setTimeout(() => {
            // Redirect the user to the login page
            alert("Session expired, login again!")
            navigate('/');
        }, 50 * 60 * 1000); // 50 minutes

        return () => clearTimeout(logoutTimer); // Clear the timer when the component unmounts or changes
    }, [navigate]);

    return (
        <>
            <nav className="Nav" >
                <ul >
                    <li id="1" className="ListItem" >
                        <Link to={"/home/profile"} className="Link" >Profile</Link>
                    </li>
                    <li id="2" className="ListItem">
                        <Link to={"/home/articles"} className="Link" >Add new articles</Link>
                    </li>
                    <li id="3" className="ListItem">
                        <Link to={"/home/article-list"} className="Link" >New order</Link>
                    </li>
                    <li id="4" className="ListItem" >
                        <Link to={'/home/current-past-orders'} className="Link" >Current/past orders</Link>
                    </li>
                    <li id="5" className="ListItem" >
                        <Link to={"/home/aprove-verify-users"} className="Link" >Aprove/Verify users</Link>
                    </li>
                    <li id="6" className="ListItem" >
                        <Link to={'/home/new-orders'} className="Link">New orders</Link>
                    </li>
                    <li id="7" className="ListItem" >
                        <Link to={'/home/my-orders'} className="Link">My orders</Link>
                    </li>
                    <li id="8" className="ListItem" >
                        <Link to={'/home/all-orders'} className="Link">All orders</Link>
                    </li>
                    <li id="9" className="ListItem">
                        <Link to={"/"} className="Link" >Sign out!</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet >
        </>
    )

}



export default Dashboard;