import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/ContextProvider";
import { useForm } from "react-hook-form";


const Singup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useContext(AuthContext);
    const navigation = useNavigate();



    const onSubmit = (data) => {
        console.log(data);

        createUser(data.email, data.password)
        .then(res => {
            const loggedUser = res.user;
            navigation("/")
            alert("Register success")

        })
        .catch(error => console.log(error.message))
    };





    return (
        <div>
            <h3 className="text-4xl text-center p-10">Sing UP!</h3>
            <div className="md:w-2/4 mx-auto mt-[30px] nav-bg shadow-2xl rounded-lg p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body font-poppins">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input  {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <p>This field is required</p>}
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
                <p className="accent-color mt-6">Have an account?<span className="underline prim-title hover:text-[#F36F1B]">
                    <Link to='/login'> Login</Link></span></p>
            </div>
        </div>
    );
};

export default Singup;