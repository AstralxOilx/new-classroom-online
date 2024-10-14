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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SquarePlus, School, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { ClassRoomCard, ClassRoomCardDashBoard } from "@/components/ui/card-classroom";
import { Colors } from '@prisma/client';
import { ColorType } from '@/types/color-types';
import { SelectSubjectTypes } from "@/components/ui/select-subjectType";
import { SelectSubject } from "@/components/ui/select-subject";
import { SelectedStatus } from "@/components/ui/selsect-status";
import { SelectColors } from '@/components/ui/select-colors';
import { SubjectIcon } from '@/lib/subjectType';

interface ClassRoom {
    class_id: number;
    class_name: string;
    description: string;
    colors: string;
    subject_type: string;
    code: string;
    userCount: string;
    status: string;
    // สามารถเพิ่มฟิลด์อื่น ๆ ตามที่คุณมีได้
}

function page() {
    const [classRoomName, setClassRoomName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [classColor, setClassColor] = useState("rose");
    const [classType, setClassType] = useState("Other");
    const [classSubject, setClassSubject] = useState("Other");
    const [classPermission, setClassPermission] = useState("pending");
    const [woring, setWoring] = useState("");
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGetRoom, setIsLoadingGetRoom] = useState(false);
    const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
    const [userId, setUserID] = useState("");
    const ColorsEnum = Object.values(Colors);
    const [selectedColor, setSelectedColor] = useState<ColorType>();


    useEffect(() => {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);

    useEffect(() => {
        if (userId) {
            getClassRoom();
        }
    }, [userId]);

    const getClassRoom = async () => {
        try {
            setIsLoadingGetRoom(true);
            const response = await axios.post('http://localhost:3000/api/get_teacher_room', {
                id: userId,
            });
            setClassRooms(response.data.classRooms);
            if (response.status === 200) {
                setIsLoadingGetRoom(false)

            };


        } catch (error) {
            console.error('Error fetching class room:', error);

        } finally {

        }
    }
    const createRoom = async () => {
        if (classRoomName !== "") {
            try {
                setIsLoading(true);
                const response = await axios.post('http://localhost:3000/api/created_room', {
                    id: session?.user.id,
                    className: classRoomName,
                    classDescription: classDescription,
                    color: classColor,
                });
                getClassRoom();

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
                <div className='z-40 grid gap-2 w-full fixed top-40 right-0'>
                    <div className='flex justify-end mr-2'>

                        <AlertDialog>
                            <AlertDialogTrigger className='flex gap-2 bg-primary p-2 font-bold text-secondary rounded-sm hover:scale-105 transition-transform duration-300'><SquarePlus />Created Room</AlertDialogTrigger>
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
                                            <SelectColors onValueChange={(color) => { setClassColor(color) }} />
                                            <SelectedStatus message='Permission' onValueChange={(type) => { setClassPermission(type) }} />
                                            <SelectSubjectTypes onValueChange={(type) => { setClassType(type) }} />
                                            <SelectSubject onValueChange={(type) => { setClassSubject(type) }} />
                                            <div>
                                                <label htmlFor="classDescription">Class Description</label>
                                                <div className='flex'>
                                                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                        <School size={28} />
                                                    </div>
                                                    <textarea
                                                        onChange={(event) => { setClassDescription(event.target.value) }}
                                                        className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full h-16 custom-textarea text-base font-medium'
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
                        Array.isArray(classRooms) && classRooms.map((room) => (
                            <div key={room.class_id}>
                                <ClassRoomCard
                                    classId={room.class_id}
                                    Name={room.class_name} // ใช้ class_name จากข้อมูล
                                    Description={room.description} // ใช้ description จากข้อมูล
                                    Color={room.colors}
                                    Icon={room.subject_type}
                                    onClickCard={() => { console.log("onClickCard") }}
                                    Code={room.code}
                                    status={room.status}
                                    count={room.userCount}
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