import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useUserinfo from "../Hooks/useUserinfo";


const AdminRouter = ({children}) => {

    const [isAdmin, isPending] = useAdmin();
    const { user, loader } = useUserinfo();

    const location = useLocation();

    if (loader || isPending) {
        return <div className="w-full text-center mt-20"><p>Loading...</p></div>;
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>

};

export default AdminRouter;