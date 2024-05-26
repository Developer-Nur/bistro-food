import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavBar from "../Shared/NavBar";

const Root = () => {

    // to get the current router location
    const location = useLocation();

    // to check if the current location is login or not
    const noHeaderFooter = location.pathname.includes('login')
        || location.pathname.includes('register');


    return (
        <div>
            {noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Root;