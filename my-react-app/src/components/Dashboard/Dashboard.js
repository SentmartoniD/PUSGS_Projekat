import { Link, Outlet } from "react-router-dom";
import './Dashboard.css'
import "../Profile/Profile.css";
import "../ApproveVerifyUsers/ApproveVerifyUsers.css";
import "../Articles/Articles.css"
import "../ArticleList/ArticleList.css"
import "../MyCart/MyCart.css"
import "../AllOrders/AllOrders.css"

function Dashboard() {

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
                        <>Past orders</>
                    </li>
                    <li id="5" className="ListItem" >
                        <Link to={"/home/aprove-verify-users"} className="Link" >Aprove/Verify users</Link>
                    </li>
                    <li id="6" className="ListItem" >
                        <>New orders</>
                    </li>
                    <li id="7" className="ListItem" >
                        <>My orders</>
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