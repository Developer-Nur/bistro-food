import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../Providers/ContextProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const { singinUser, loader } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    console.log("loction", location.state);


    useEffect(() => {
        // Adding a slight delay to ensure the captcha component is mounted
        const timer = setTimeout(() => {
            loadCaptchaEnginge(6);
        }, 1000); // 50 ms delay

        return () => clearTimeout(timer);
    }, []);


    // if (loader) {
    //     return <div><p>Loading....</p></div>
    // }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        singinUser(email, password)
            .then(result => {
                const user = result.user;
                alert("Login success")
                navigate(from, { replace: true });
            })
    }

    const handleCaptchaValidat = (e) => {
        const user_captcha_value = e.target.value;

        console.log("capcha", user_captcha_value);

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else { setDisabled(true) }
    }

    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card w-full shadow-2xl nav-bg">
                    <Link to={'/'}><button className='btn-ghost text-center p-4'>Go Home</button></Link>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {/* captcha */}
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onBlur={handleCaptchaValidat} type="text" className='mb-3 input input-bordered block' placeholder='Type here' />
                        </div>

                        <input disabled={false} type="submit" value='Submit' className="btn btn-primary" />

                        <div className="text-center">
                            <div className="divider">OR</div>
                            <section className="space-x-6">
                                <button className="shadow-xl btn btn-ghost">Login with Google</button>
                                <button className="shadow-xl btn btn-ghost">Login with GitHub</button>
                            </section>
                        </div>
                    </form>
                    <div className='card-body pt-0'>
                        <p className="accent-color mt-6">Have an account?
                            <span className="underline prim-title hover:text-[#F36F1B]">
                                <Link to='/register'> Register</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;