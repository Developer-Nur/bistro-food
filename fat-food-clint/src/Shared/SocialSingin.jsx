import { useContext } from "react";
import { AuthContext } from "../Providers/ContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const SocialSingin = () => {

    // axios base url for public
    const axiosPublic = useAxiosPublic();

    // redirection the use where he was before login
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { googleSingin } = useContext(AuthContext);

    const handleSocialSingIn = () => {
        googleSingin()
            .then(result => {
                const socialLogedInUserInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email
                }
                axiosPublic.post('/create-user', socialLogedInUserInfo)
                .then(() => navigate(from, { replace: true }))

                
            }
            )
            .catch(error => console.log(error.message))

    }

    return (
        <div className="p-8 text-center">
            <div className="divide"></div>
            <div>
                <button className="shadow-xl btn btn-ghost" onClick={handleSocialSingIn}>
                    Google Login
                </button>
            </div>
        </div>


    );
};
export default SocialSingin;