"use client";

import React from 'react';
import { useState, useEffect } from "react";
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
import { ClassRoomCard } from "@/components/ui/card-classroom";


interface ClassRoom {
    class_id: number;
    class_name: string;
    description: string;
    color: string;
    subject_type: string;
    status: string;
    code: string;
    userCount: string;
    // สามารถเพิ่มฟิลด์อื่น ๆ ตามที่คุณมีได้
}


function page() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGetRoom, setIsLoadingGetRoom] = useState(false);
    const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
    const [userId, setUserID] = useState("");
    const [code, setCode] = useState("");



    useEffect(() => {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        if (userId) {
            getClassRoom();
        }
    }, [userId]); // เพิ่ม userId เป็น dependency

    const getClassRoom = async () => {
        try {
            setIsLoadingGetRoom(true);
            const response = await axios.post('http://localhost:3000/api/get_student_room', {
                id: userId,
            });
            setClassRooms(response.data.classRooms);
            if (response.status === 200) {
                setIsLoadingGetRoom(false)
            };
        } catch (error) {

        } finally {

        }
    }

    const joinRoom = async () => {
        if (code !== "") {
            try {
                setIsLoading(true);
                const response = await axios.post('http://localhost:3000/api/add_classroom', {
                    userId: userId,
                    code: code
                })
                getClassRoom();
                toast("Classroom Joined successfully! ", {
                    action: {
                        label: "X",
                        onClick: () => console.log("Undo"),
                    },
                    className: "text-green-500 shadow-lg p-4 rounded-lg", // เพิ่มสไตล์ที่นี่
                    duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                });
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast("Error Event has been Joined", {
                        description: error.response ? error.response.data.message : error.message,
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        },
                        className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                        duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                    });
                } else {
                    toast("Error Event has been Joined", {
                        description: error + '',
                        action: {
                            label: "X",
                            onClick: () => console.log("Undo"),
                        },
                        className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                        duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                    });
                }

            } finally {
                setIsLoading(false);
                setCode("");
            }

        } else {
            toast("Error Event has been Joined ", {
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
                            <AlertDialogTitle>Joined Classroom....</AlertDialogTitle>
                            <AlertDialogDescription className='flex gap-2'>
                                <LoaderCircle size={30} className='animate-spin' />
                                <span>Currently Joined Classroom. Please wait...</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="flex justify-center items-center bg-primary/5 h-[2rem] w-full fixed top-30">
                    <p className='text-lg font-bold text-primary/60  '>ClassRoom</p>
                </div>
                <div className='z-40 grid gap-2 w-full fixed top-40 right-0'>
                    <div className='flex justify-end mr-2'>

                        <AlertDialog>
                            <AlertDialogTrigger className='flex gap-2 bg-primary p-2 font-bold text-secondary rounded-sm hover:scale-105 transition-transform duration-300'><SquarePlus />
                                Joined Room
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Joined Classroom</AlertDialogTitle>
                                    <AlertDialogDescription></AlertDialogDescription>
                                    <div>
                                        <form className='grid gap-4'>
                                            <div>
                                                <label htmlFor="roomname">Code Classroom</label>
                                                <div className='flex'>
                                                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                        <School size={28} />
                                                    </div>
                                                    <input onChange={(event) => { setCode(event.target.value) }} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full' type="text" name="roomname" id="roomname" placeholder='class room name' />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={joinRoom}>Joined</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>


                <div className='ml-3 mr-3 mb-5 mt-10 flex flex-wrap'>

                    <AlertDialog open={isLoadingGetRoom} onOpenChange={setIsLoading}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Loading Classroom....</AlertDialogTitle>
                                <AlertDialogDescription className='flex gap-2'>
                                    <LoaderCircle size={30} className='animate-spin' />
                                    <span>Currently Loading Classroom. Please wait...</span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                        </AlertDialogContent>
                    </AlertDialog>

                    {
                        Array.isArray(classRooms) && classRooms
                            .filter(room => room.status === "active") // กรองเฉพาะห้องเรียนที่มี status เป็น active
                            .map((room) => (
                                <div key={room.class_id}>
                                    <ClassRoomCard
                                        classId={room.class_id}
                                        Name={room.class_name} // ใช้ class_name จากข้อมูล
                                        Description={room.description} // ใช้ description จากข้อมูล
                                        Color={room.color}
                                        Icon={room.subject_type}
                                        onClickCard={() => { console.log("onClickCard") }}
                                        Code={room.code}
                                        count={room.userCount}
                                        status={room.status}
                                    />
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default page