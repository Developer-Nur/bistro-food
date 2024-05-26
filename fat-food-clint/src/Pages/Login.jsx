import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {

    const [disabled, setDisabled] = useState(true);
    const captchaRef = useRef(null);

    useEffect(() => {
        loadCaptchaEnginge(6); 
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);
    }

    const handleCaptchaValidat = () => {
        const user_captcha_value = captchaRef.current.value;

        if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
        }
        else{ setDisabled(true)}
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input ref={captchaRef} name='captha' type="text" placeholder="Type here" className="input input-bordered" required />

                            <button onClick={handleCaptchaValidat} className='my-3 btn btn-outline btn-xs'>
                                validate captcha
                            </button>
                        </div>

                        <input disabled={disabled} type="submit" value='Submit' className="btn btn-primary" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;