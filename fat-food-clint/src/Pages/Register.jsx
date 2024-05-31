import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/ContextProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import SocialSingin from "../Shared/SocialSingin";


const Singup = () => {

    const axiosPublic = useAxiosPublic();

    // react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // context provider
    const { createUser, updaleProfileOfUser, logOut } = useContext(AuthContext);
    const navigation = useNavigate();



    const onSubmit = (data) => {


        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user;
                updaleProfileOfUser(data.name, data.image)
                    .then()
                    .catch((error) => console.log(error.message))
                reset()
                // alert("Register success, please login")
                logOut()
                    .then()
                    .catch(error => console.log(error.message))

                // creating users to the database
                const userInFoForDb = {
                    name: data.name,
                    email: data.email,
                }
                axiosPublic.post('/create-user', userInFoForDb)
                    .then(res => {
                        if (res.data.insertedId) {
                            alert("Register success, please login");
                            navigation('/login')
                        }
                    })
            })
            .catch(error => console.log(error.message))
    };


    return (
        <div>
            <h3 className="text-4xl text-center p-10">Sing UP!</h3>
            <div className="md:w-2/4 mx-auto mt-[30px] nav-bg shadow-2xl rounded-lg p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body font-poppins">
                    <Link to={'/'}><button className='btn-ghost text-center p-4'>Go Home</button></Link>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input  {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <p>This field is required</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input  {...register("image", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                        {errors.image && <p>Put image URL</p>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input  {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                        {errors.password && <p>This field is required</p>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input   {...register("password", { required: true, maxLength: 20, minLength: 6 })} type="password" placeholder="password" className="input input-bordered" />
                        {errors.password && <p>Lenths is 6 to 20</p>}
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn  sec-color prim-bg text-[18px]">Sing UP</button>
                    </div>

                </form>
                <div className="divider"></div>
                <SocialSingin/>
                <div className="divider"></div>
                <p className="accent-color mt-6">Have an account?<span className="underline prim-title hover:text-[#F36F1B]">
                    <Link to='/login'> Login</Link></span></p>
            </div>
        </div>
    );
};

export default Singup;