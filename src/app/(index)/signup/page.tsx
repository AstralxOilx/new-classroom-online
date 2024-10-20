"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RoleSelect from '@/components/ui/select-role';
import InputField from '@/components/ui/input-field';
import InputPassword from '@/components/ui/input-password';
import { validateFormSignup } from '@/lib/checkInput';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';


export default function Page() {
    const [inputWarning, setInputWarning] = useState('');
    const [textWarning, setTextWarning] = useState('');
    const [inputData, setInputData] = useState({
        user_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        identification: '',
        role: '',
    });

    // ใช้ฟังก์ชันเดียวในการจัดการอินพุตทุกฟิลด์
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value, // อัปเดตตาม name ของฟิลด์ที่กำลังเปลี่ยน
        }));
    };

    const handleSubmit = async () => {
        // เช็คว่าฟิลด์ทั้งหมดไม่ใช่ค่าว่าง
        const { user_name, email, password, confirmPassword, identification, role } = inputData;

        if (user_name && email && password && confirmPassword && identification && role) {

            if (password !== confirmPassword) {
                setInputWarning('Passwords do not match!');
                setTextWarning('bg-red-100 text-red-800 p-1')
            } else {
                try {
                    validateFormSignup(user_name, email, password);
                    const response = await axios.post('http://localhost:3000/api/auth/signup', {
                        user_name,
                        email,
                        password,
                        identification,
                        role
                    });
                    setInputData({
                        user_name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        identification: '',
                        role: '',
                    })
                    setInputWarning(response.data.message);
                    setTextWarning('bg-green-100 text-green-800 p-1')

                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        setInputWarning(error.response.data.message || 'An error occurred.');
                        setTextWarning('bg-red-100 text-red-800 p-1')
                    } else {
                        setInputWarning('An unexpected error occurred.');
                        setTextWarning('bg-red-100 text-red-800 p-1')
                    }
                } finally {

                }

            }
        } else {
            // แจ้งเตือนว่ามีฟิลด์ที่ว่าง
            setInputWarning('Please fill in all fields.');
            setTextWarning('bg-red-100 text-red-800 p-1')
        }
    };


    return (
        <>
            <div className='grid gap-2 rounded-md content-center w-[300px] sm:w-[700px] min-w-[350px] max-w-[800px]'>
                <div className='h-32 bg-primary/10 rounded-md w-[300px] sm:w-[700px] min-w-[350px] max-w-[800px]'></div>
                <div className='p-2 grid gap-2 w-full border border-primary/10 rounded-md bg-primary/5'>
                    <div className='bg-primary/5 rounded-md'>
                        <p className={`text-md font-bold ${textWarning}`}>{inputWarning}</p>
                    </div>

                    {/* Name input */}
                    <InputField
                        onInputChange={(data) => handleInputChange({ target: { name: 'user_name', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        type='text'
                        icon='user'
                        label='Name'
                        name='user_name'
                        description='must contain at least 4 letters And no more than 20 ex.user'
                        placeholder='name'
                        value={inputData.user_name}
                    />

                    {/* Email input */}
                    <InputField
                        onInputChange={(data) => handleInputChange({ target: { name: 'email', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        type='mail'
                        icon='mail'
                        label='Email'
                        name='email'
                        description='email format ex.user@email.com'
                        placeholder='email'
                        value={inputData.email}
                    />

                    {/* Role select */}
                    <RoleSelect
                        onRoleChange={(data) => handleInputChange({ target: { name: 'role', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                        value={inputData.role}
                    />

                    {/* Student ID or Teacher ID input */}
                    <InputField
                        onInputChange={(data) => handleInputChange({ target: { name: 'identification', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        type='text'
                        icon='idCard'
                        label='Student ID OR Teacher ID'
                        name='identification'
                        description='Student ID or Teacher ID ex.65123456789-1'
                        placeholder='Student ID or Teacher ID'
                        value={inputData.identification}
                    />

                    {/* Password input */}
                    <InputPassword
                        onPasswordChange={(data) => handleInputChange({ target: { name: 'password', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        label='Password'
                        name='password'
                        description='must be at least 6 characters long ex.password'
                        placeholder='password'
                        value={inputData.password}
                    />

                    {/* Confirm Password input */}
                    <InputPassword
                        onPasswordChange={(data) => handleInputChange({ target: { name: 'confirmPassword', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        label='Confirm Password'
                        name='confirmPassword'
                        description='Confirm Password ex.password matches password'
                        placeholder='Confirm Password'
                        value={inputData.confirmPassword}
                    />

                    {/* Sign Up Button */}
                    <Button
                        className='w-24'
                        variant={"default"}
                        size={"sm"}
                        onClick={handleSubmit}
                    >
                        <LogIn />
                        Sign Up
                    </Button>

                    {/* Link to Sign In */}
                    <p className='text-md mt-1'>
                        You haven't <Link href={"/"} className='text-primary/80 underline'>Signed in</Link> yet, right?
                    </p>
                </div>
            </div>
        </>
    );
}
