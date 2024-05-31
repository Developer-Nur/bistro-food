import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/ContextProvider";
import { TiShoppingCart } from "react-icons/ti";
import useCards from "../Hooks/useCards";

const NavBar = () => {

    const { user, loader, logOut } = useContext(AuthContext);

    // data from transtec query
    const [card] = useCards ();


    const handleLogout = () => {
        logOut()
            .then(() => alert("Logout Success"))
            .catch(error => console.log(error.message))
    }

    const navBar = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Our Menu</Link></li>
        <li><Link to="/shop/salad">Our Shop</Link></li>
        {
            !user && <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li></>
        }
        <li><Link to="/secret">Secret</Link></li>
    </>


    // if (loader) {
    //     return <div><p>Loading....</p></div>
    // }

    return (
        <div className="navbar text-white fixed z-10 max-w-7xl	mx-auto w-full px-6 md:px-0 lg:px-0 md:w-11/12 lg:w-11/12 bg-orange-500">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>


                    {/* Nav for small devices */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navBar}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Fat Food</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navBar}
                </ul>
            </div>

            <div className="navbar-end">
                {
                    user && <div className="flex gap-2">
                        <span>{user?.displayName}</span>
                        <button onClick={handleLogout} className="py-1 px-2 rounded-lg btn-ghost">Logout</button>
                    </div>
                }
                <Link to="/dashboard/cart">
                    <button className="btn">
                        <TiShoppingCart />
                        <div className="badge badge-secondary">{card.length}</div>
                    </button>
                </Link>
            </div>
        </div >
    );
};

export default NavBar;