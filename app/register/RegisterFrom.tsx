'use client'

import { useState } from 'react';
import Heading from '../components/Heading';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../components/inputs/Input';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    }); 

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log("data", data);
    }

    return (
        <>
            <Heading title='Sign up for E-shop'/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Button
                outline
                label='Sign Up with Google'
                icon={AiOutlineGoogle}
                onClick={() => {}} 
            />
            <Input 
                id="name"
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type='password'
            />
            <Button 
                label={isLoading ? "Loading" : "Sign Up"} 
                onClick={handleSubmit(onSubmit)}
            />
            <p className='text-sm'>
                Already have an account? {" "}
                <Link className='underLine' href={"/login"}>
                   Log in
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
