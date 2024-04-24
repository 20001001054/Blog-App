import React, {useState} from 'react'
import authservice, { AuthService } from '../Appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import authSlice, { login } from '../Store/authSlice'
import {Button ,Input , Logo} from './index'
import {useDispatch} from 'react-redux'
import{useForm} from 'react-hook-form'

function SignUp() {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) =>{
        setError("")
        try {
         const userData = await authservice.createAccount(data)
         if(userData){
           const userData =  await authservice.getCurrentUser()
           if(userData) dispatch(login(userData));
           navigate("/")
         }
        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-purple-100 mt-15px rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                    label = "Name: "
                    placeholder = "Enter your full name"
                    {...register("name",{
                        required: true,
                    })}
                    />
                    <Input 
                        label = "Email:"
                        placeholder= "Enter your email"
                        type = "Email"
                        {...register("email", {
                            required: true,
                            validate:{
                                matchPatern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/. test(value) || "Please enter valid Email address"
                            }
                    })}
                    />
                    <Input 
                    label= "Password:"
                    type= "passwprd"
                    placeholder="Enter your password"
                    {...register("password",{
                        required: true,
                    })}
                    />
                    <Button
                    type = "submit"
                    className = "w-full"
                    >Create Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUp
