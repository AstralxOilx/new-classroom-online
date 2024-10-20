"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import InputPassword from '@/components/ui/input-password';
import { LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from "next-auth/react";


export default function Page() {
    const [inputWarning, setInputWarning] = useState('');
    const [textWarning, setTextWarning] = useState('');
    const router = useRouter();
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
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
        const { email, password } = inputData;
        if (email && password) {
            try {
                const signInData = await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false
                  });
                  if (signInData?.error) {
                    setInputWarning(signInData.error);
                  } else {
                    router.push("/dashboard");
                  }
            } catch (error) {
                console.log("error: ", error)
            }finally {
            
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
                    {/* Password input */}
                    <InputPassword
                        onPasswordChange={(data) => handleInputChange({ target: { name: 'password', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                        label='Password'
                        name='password'
                        description='must be at least 6 characters long ex.password'
                        placeholder='password'
                        value={inputData.password}
                    />
                    {/* Sign Up Button */}
                    <Button
                        className='w-24'
                        variant={"default"}
                        size={"sm"}
                        onClick={handleSubmit}
                    >
                        <LogIn />
                        Sign In
                    </Button>

                    {/* Link to Sign In */}
                    <p className='text-md mt-1'>You haven't <Link href={"/signup"} className='text-primary/80 underline'>Signed up</Link> yet, right?</p>
                </div>
            </div>
        </>
    );
}
