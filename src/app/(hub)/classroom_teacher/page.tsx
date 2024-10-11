"use client";

import React from 'react';
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SquarePlus, School, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useSession } from "next-auth/react";


function page() {
    const [classRoomName, setClassRoomName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [woring, setWoring] = useState("");
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const createRoom = async () => {
        if (classRoomName !== "" && classDescription !== "") {
            if (classRoomName.length >= 20 && classDescription.length >= 50) {
                toast("Error Event has been created Name: ", {
                    description: "The classroom name must be no longer than 20 characters and the description must be no longer than 50 characters.",
                    action: {
                        label: "X",
                        onClick: () => console.log("Undo"),
                    },
                    className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                    duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                });
            } else {
                try {
                    setIsLoading(true);
                    const response = await axios.post('http://localhost:3000/api/created_room', {
                        id: session?.user.id,
                        className: classRoomName,
                        classDescription: classDescription
                    });
                    console.log(response.data);

                    toast("Classroom created successfully! " + classRoomName, {
                        description: classRoomName,
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        },
                        className: "text-green-500 shadow-lg p-4 rounded-lg", // เพิ่มสไตล์ที่นี่
                        duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                    });

                } catch (error: unknown) {
                    toast("Error Event has been created Name: ", {
                        description: "Unauthorized: Only teachers can create classrooms.",
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        },
                        className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                        duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                    });
                } finally {
                    setIsLoading(false);
                    setClassRoomName("");
                    setClassDescription("");
                }
            }
        } else {
            toast("Error Event has been created Name: ", {
                description: "Please fill in all the required fields.",
                action: {
                    label: "X",
                    onClick: () => console.log("Undo"),
                },
                className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg",
                duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
            });
        }
    }

    return (
        <>
            <div className='grid gap-2 relative'>

                <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Classroom created....</AlertDialogTitle>
                            <AlertDialogDescription className='flex gap-2'>
                                <LoaderCircle size={30} className='animate-spin' />
                                <span>Currently Classroom created. Please wait...</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="flex justify-center items-center bg-primary/5 h-[2rem] w-full fixed top-30">
                    <p className='text-lg font-bold text-primary/60  '>ClassRoom</p>
                </div>
                <div className='grid gap-2 w-full fixed top-40 right-0'>
                    <div className='flex justify-end mr-2'>

                        <AlertDialog>
                            <AlertDialogTrigger className='flex gap-2 bg-primary p-2 font-bold text-secondary rounded-sm'><SquarePlus />Created Room</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Created Classroom</AlertDialogTitle>
                                    <AlertDialogDescription></AlertDialogDescription>
                                    <div>
                                        <form className='grid gap-4'>
                                            <div>
                                                <label htmlFor="roomname">Class Name</label>
                                                <div className='flex'>
                                                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                        <School size={28} />
                                                    </div>
                                                    <input onChange={(event) => { setClassRoomName(event.target.value) }} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full' type="text" name="roomname" id="roomname" placeholder='class room name' />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="classDescription">Class Description</label>
                                                <div className='flex'>
                                                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                        <School size={28} />
                                                    </div>
                                                    <textarea
                                                        onChange={(event) => { setClassDescription(event.target.value) }}
                                                        className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full resize-none h-32 text-base font-medium'
                                                        name="classDescription"
                                                        id="classDescription"
                                                        placeholder='Enter class description'
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={createRoom}>Created</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>


                <div className='ml-3 mr-3 mb-5 mt-10 flex flex-wrap'>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                    <div className='h-44 w-[18rem] bg-primary/10 m-3 rounded-md hover:cursor-pointer hover:scale-105 transition-transform duration-300'></div>
                </div>

            </div>
        </>
    )
}

export default page