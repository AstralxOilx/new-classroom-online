"use client";

import React from 'react';
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { ColorType } from '@/types/color-types';
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
import { SquarePlus, School, LoaderCircle, Palette } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { ClassRoomCard, ClassRoomCardDashBoard } from "@/components/ui/card-classroom";
import { Colors } from '@prisma/client';


interface ClassRoom {
    class_id: number;
    class_name: string;
    description: string;
    colors: string;
    subject_type: string;
    // สามารถเพิ่มฟิลด์อื่น ๆ ตามที่คุณมีได้
}

export const colorCode = (color: ColorType): string => {
    switch (color) {
        case 'gray':
            return 'bg-[#4B5563]';
        case 'orange':
            return 'bg-[#F97316]';
        case 'amber':
            return 'bg-[#FBBF24]';
        case 'yellow':
            return 'bg-[#FDE047]';
        case 'lime':
            return 'bg-[#84CC16]';
        case 'green':
            return 'bg-[#22C55E]';
        case 'emerald':
            return 'bg-[#10B981]';
        case 'teal':
            return 'bg-[#14B8A6]';
        case 'cyan':
            return 'bg-[#06B6D4]';
        case 'sky':
            return 'bg-[#0EA5E9]';
        case 'blue':
            return 'bg-[#3B82F6]';
        case 'indigo':
            return 'bg-[#4F46E5]';
        case 'violet':
            return 'bg-[#8B5CE8]';
        case 'purple':
            return 'bg-[#A855F7]';
        case 'fuchsia':
            return 'bg-[#D946EF]';
        case 'pink':
            return 'bg-[#EC4899]';
        case 'rose':
            return 'bg-[#F43F5E]';
        case 'red':
            return 'bg-[#EF4444]';
        default:
            return 'bg-[#3B82F6]';  // Default color
    }
};

function page() {
    const [classRoomName, setClassRoomName] = useState("");
    const [classDescription, setClassDescription] = useState("");
    const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
    const [classColor, setClassColor] = useState("rose");
    const [woring, setWoring] = useState("");
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingGetRoom, setIsLoadingGetRoom] = useState(false);
    const [userId, setUserID] = useState("");
    const ColorsEnum = Object.values(Colors);




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
            const response = await axios.post('http://localhost:3000/api/get_teacher_room', {
                id: userId,
            });
            setClassRooms(response.data.getClassRoom);

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
                                    <div className='text-left'>
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
                                                <p>Color</p>
                                                <div className='flex'>
                                                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                        <Palette size={28} />
                                                    </div>
                                                    <Select onValueChange={setClassColor}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ColorsEnum.map((color) => (
                                                                <SelectItem key={color} value={color}>
                                                                    <div className='flex gap-2 items-center'>
                                                                        {/* ใช้ฟังก์ชัน colorCode ในการแปลงสี */}
                                                                        <div className={`w-[40px] h-[20px] rounded-lg ${colorCode(color as ColorType)}`} />
                                                                        {/* แสดงชื่อสีโดยทำให้ตัวแรกเป็นตัวใหญ่ */}
                                                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
                                <ClassRoomCardDashBoard
                                    classId={room.class_id}
                                    Name={room.class_name} // ใช้ class_name จากข้อมูล
                                    Description={room.description} // ใช้ description จากข้อมูล
                                    Color={room.colors}
                                    Icon={room.subject_type}
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