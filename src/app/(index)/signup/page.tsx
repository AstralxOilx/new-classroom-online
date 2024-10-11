"use client";
import React from 'react'
import { Mail, Lock, EyeOff, Eye, User, Layers2, LoaderCircle } from "lucide-react";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { validateFormSignup } from '@/lib/checkInput';
import axios from 'axios';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function page() {


    
    const [showconfirmPass, setShowconfirmPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [warning, setWarning] = useState("");
    const [cssWarning, setCSSWarning] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });


    // ฟังก์ชันสำหรับจัดการเมื่อ input มีการเปลี่ยนแปลง
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target; // ดึง name และ value จาก input
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // อัปเดตข้อมูลฟอร์มตาม input ที่เปลี่ยนแปลง
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.email != "" && formData.password != "" && formData.name != "" && formData.confirmPassword != "" && formData.role != "") {
            if (formData.password === formData.confirmPassword) {
                try {
                    setIsLoading(true);
                    validateFormSignup(formData.name, formData.email, formData.password);
                    try {
                        const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
                        setWarning(response.data.message);
                        setFormData({
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: '',
                        });
                        setCSSWarning("text-green-600");


                    } catch (error: unknown) {
                        if (axios.isAxiosError(error)) {
                            // ตรวจสอบว่าข้อผิดพลาดมาจาก Axios หรือไม่
                            const { response } = error; // รับ response จากข้อผิดพลาด
                            if (response) {
                                const { status, data } = response; // รับสถานะและข้อมูลจาก response
                                if (status === 500 || status === 400) {
                                    setCSSWarning("text-rose-600");
                                    setWarning(data.message); // แสดงข้อความเตือน
                                }
                            } else {
                                console.error('No response received:', error.message);
                            }

                        } else {
                            console.error('Error during registration:', (error as Error).message); // แสดงข้อความผิดพลาดทั่วไป
                            setCSSWarning("text-rose-600");
                        }
                    }

                } catch (error) {
                    if (error instanceof Error) {
                        setCSSWarning("text-rose-600");
                        setWarning(error.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            } else {
                setWarning('Passwords do not match');
                setCSSWarning("text-rose-600");
            }

        } else {
            setWarning("Please fill in all the required fields.");
            setCSSWarning("text-rose-600");
        }
    };
    return (
        <>
            <div className='grid justify-items-center'>
                <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sign up....</AlertDialogTitle>
                            <AlertDialogDescription className='flex gap-2'>
                                <LoaderCircle size={30} className='animate-spin' />
                                <span>Currently sign up. Please wait...</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                <div className='rounded-t-lg h-56 bg-primary/5 w-[300px] sm:w-[700px] min-w-[350px] max-w-[800px]'>

                </div>

                <div className={`${cssWarning} text-center text-md font-bold bg-primary/10 w-full h-6 p-4`}>
                    <p>{warning}</p>
                </div>
                <div className="flex justify-center content-center bg-primary/10 rounded-b-lg ">
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-1 pl-4 pr-4 pb-4 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                            <label htmlFor="name">Name</label>
                            <div className='flex'>
                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                    <User size={28} />
                                </div>
                                <input onChange={handleChange} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full'
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder='name'
                                    value={formData.name}
                                />
                            </div>
                            <div className='text-sm text-primary bg-primary/5 pl-2 rounded-md'>
                                <p>must contain at least 4 letters And no more than 20 ex.user</p>
                            </div>
                            <label htmlFor="email">Email</label>
                            <div className='flex'>
                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                    <Mail size={28} />
                                </div>
                                <input onChange={handleChange} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full'
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder='email'
                                    value={formData.email}
                                />
                            </div>
                            <div className='text-sm text-primary bg-primary/5 pl-2 rounded-md'>
                                <p>email format ex.user@email.com</p>
                            </div>
                            <label htmlFor="password">Password</label>
                            <div className='flex relative'>
                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                    <Lock size={28} />
                                </div>
                                <input
                                    onChange={handleChange}
                                    className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full'
                                    type={showPass ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder='password'
                                    value={formData.password}
                                />
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={(e) => {
                                        e.preventDefault(); // ป้องกันการส่งฟอร์ม
                                        setShowPass(!showPass); // เปลี่ยนสถานะ showPass
                                    }}
                                    className='rounded-r-sm absolute right-0 text-primary/20 '
                                >
                                    {!showPass ? (<EyeOff className='hover:text-primary/60' size={28} />) : (<Eye className='hover:text-primary/60' size={28} />)}
                                </Button>
                            </div>
                            <div className='text-sm text-primary bg-primary/5 pl-2 rounded-md'>
                                <p>must be at least 6 characters long ex.password</p>
                            </div>
                            <label htmlFor="confirmPassword">confirmPassword</label>
                            <div className='flex relative'>
                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                    <Lock size={28} />
                                </div>
                                <input
                                    onChange={handleChange}
                                    className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full'
                                    type={showconfirmPass ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder='confirmPassword'
                                    value={formData.confirmPassword}
                                />
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={(e) => {
                                        e.preventDefault(); // ป้องกันการส่งฟอร์ม
                                        setShowconfirmPass(!showconfirmPass); // เปลี่ยนสถานะ showPass
                                    }}
                                    className='rounded-r-sm absolute right-0 text-primary/20'
                                >
                                    {!showconfirmPass ? (<EyeOff className='hover:text-primary/60' size={28} />) : (<Eye className='hover:text-primary/60' size={28} />)}
                                </Button>
                            </div>
                            <div className='text-sm text-primary bg-primary/5 pl-2 rounded-md'>
                                <p>Passwords must match ex.password</p>
                            </div>

                            <label htmlFor="role">Role</label>
                            <div className='flex'>
                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                    <Layers2 size={28} />
                                </div>
                                <select
                                    className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 '
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange} // เชื่อมโยงฟังก์ชัน handleChange
                                >
                                    <option value="">Select a role</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>

                            <div className='text-sm text-primary bg-primary/5 pl-2 rounded-md'>
                                <p>Select the role: Student or Teacher</p>

                            </div>
                            <div className='w-[100px]'>
                                <Button
                                    variant={"default"}
                                    size={"sm"}
                                    type='submit'
                                    className='bg-primary/90'
                                >
                                    Sign In
                                </Button>
                            </div>
                            <p className='text-md mt-1'>You haven't <Link href={"/"} className='text-primary/80 underline'>Signed in</Link> yet, right?</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default page