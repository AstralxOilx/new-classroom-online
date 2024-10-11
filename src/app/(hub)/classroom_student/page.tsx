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
import { SquarePlus, School } from "lucide-react";

function page() {
    const [classRoomName , setClassRoomName] = useState("");

    return (
        <>
            <div className='grid gap-2'>
                <div className="flex justify-center items-center bg-primary/5 h-[2rem] ">
                    <p className='text-lg font-bold text-primary/60'>ClassRoom</p>
                </div>
                <div className='grid gap-2 w-full h-full '>
                    <div className='flex justify-end mr-4'>

                        <AlertDialog>
                            <AlertDialogTrigger className='flex gap-2 bg-primary p-2 font-bold text-secondary rounded-sm'><SquarePlus />Joined Room</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Joined Classroom</AlertDialogTitle>
                                    <AlertDialogDescription></AlertDialogDescription>
                                    <div>
                                        <form action="">
                                            <label htmlFor="roomcode">Classroom Code</label>
                                            <div className='flex'>
                                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                    <School size={28}/>
                                                </div>
                                                <input onChange={(event) => {setClassRoomName(event.target.value) }} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full' type="text" name="roomcode" id="roomcode" placeholder='Classroom Code' />
                                            </div>
                                        </form>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => { console.log(classRoomName); }}>Created</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>
            </div>
        </>
    )
}

export default page