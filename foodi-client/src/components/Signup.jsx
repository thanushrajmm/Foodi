import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from './Modal';
import { AuthContext } from '../contexts/AuthProvider';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {createUser, login} = useContext(AuthContext);
        //redirecting to homepage or specific page
        const location = useLocation();
        const navigate = useNavigate();
        const from = location.state?.from?.pathname || "/";
    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email,password).then((result) => {
          // Signed up 
          const user = result.user;
          alert("Account creation successfull!")
          document.getElementById('my_modal_3').close()
          navigate(from, {replace: true})
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="modal-box m-0 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className='font-bold text-lg'>Create A Account!</h3>
                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required {...register("email")} />
                    </div>
                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" required {...register("password")} />
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover"> Forgot password? </a>
                        </label>
                    </div>

                    {/* login btn */}
                    <div className="form-control mt-6">
                        <input type="submit" value="Signup" className="btn bg-green text-white" />
                    </div>
                    <p className='text-center my-2'>Have an account? <button to="/signup" className='underline text-red ml-1'
                    onClick={() => document.getElementById('my_modal_3').showModal()}
                    >Login</button></p>
                    <Link 
                    to="/"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>
                <div className='text-center space-x-3 mb-5'>
                    <button className="btn btn-circle btn-outline hover:bg-green hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle btn-outline hover:bg-green hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle btn-outline hover:bg-green hover:text-white">
                        <FaGithub />
                    </button>
                </div>
            </div>
            <Modal/>
        </div>
        
    )
}

export default Signup;
