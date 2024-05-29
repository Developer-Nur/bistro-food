import { useContext } from "react";
import { AuthContext } from "../Providers/ContextProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRouter = ({children}) => {

    const {user, loader} = useContext(AuthContext);
    const location = useLocation();

    if (loader) {
        return <div className="w-full text-center mt-20"><p>Loading...</p></div>;
    }
    if(user){
        return children;
    }


    return <Navigate to='/login'  state={{ from: location }} replace></Navigate>
};

export default PrivetRouter;