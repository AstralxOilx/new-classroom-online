"use client";
import React from 'react'
import { Mail, Lock, EyeOff, Eye ,LoaderCircle} from "lucide-react";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


function page() {
  const [showPass, setShowPass] = useState(false);
  const [warning, setWarning] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',  // สถานะสำหรับเก็บอีเมล
    password: '',  // สถานะสำหรับเก็บรหัสผ่าน
  });
  // ฟังก์ชันสำหรับจัดการเมื่อ input มีการเปลี่ยนแปลง
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // ดึง name และ value จาก input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // อัปเดตข้อมูลฟอร์มตาม input ที่เปลี่ยนแปลง
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email != "" && formData.password != "") {
      try {
        setIsLoading(true);
        const signInData = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (signInData?.error) {
          setWarning(signInData.error);
        } else {
          router.push("/dashboard");
        }

      } catch (error) {
        console.log("error: ", error)
      } finally {
        setIsLoading(false);
      }
    } else {
      setWarning("Please fill in all the required fields.");
    }
  };
  return (
    <>
      <div className='grid justify-items-center'>
        <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Sign in....</AlertDialogTitle>
              <AlertDialogDescription className='flex gap-2'>
                <LoaderCircle size={30} className='animate-spin' />
                <span>Currently sign in. Please wait...</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
        <div className='rounded-t-lg h-56 bg-primary/5 w-[300px] sm:w-[700px] min-w-[350px] max-w-[800px]'>
        </div>
        <div className='text-rose-600 pl-2 text-md bg-primary/5 w-[300px] sm:w-[700px] min-w-[350px] max-w-[800px]'>
          <p>{warning}</p>
        </div>
        <div className="flex justify-center content-center p-[1px] bg-primary/10 rounded-b-lg ">

          <form onSubmit={handleSubmit}>
            <div className='grid gap-1 p-4 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
              <label htmlFor="email">Email</label>
              <div className='flex'>
                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                  <Mail size={28} />
                </div>
                <input onChange={handleChange} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full' type="email" name="email" id="email" placeholder='email' />
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
                />
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  onClick={(e) => {
                    e.preventDefault(); // ป้องกันการส่งฟอร์ม
                    setShowPass(!showPass); // เปลี่ยนสถานะ showPass
                  }}
                  className='rounded-r-sm absolute right-0 text-primary/20'
                >
                  {!showPass ? (<EyeOff size={28} />) : (<Eye size={28} />)}
                </Button>
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
              <p className='text-md mt-1'>You haven't <Link href={"/signup"} className='text-primary/80 underline'>Signed up</Link> yet, right?</p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page