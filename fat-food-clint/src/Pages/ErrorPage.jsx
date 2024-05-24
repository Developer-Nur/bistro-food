import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="w-full mx-auto">
            <h2>404 Page not found
            </h2>
            <Link to={'/'}>
                <button className="btn btn-secondary">Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;