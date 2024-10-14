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
import { Settings, Settings2, UserRoundCog, Share2, School } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { ClassRoomCard, ClassRoomCardDashBoard } from "@/components/ui/card-classroom";
import { Colors } from '@prisma/client';
import { ColorType } from '@/types/color-types';
import { SelectColors } from '@/components/ui/select-colors';
import { SelectSubjectTypes } from "@/components/ui/select-subjectType";
import { SelectedStatus } from "@/components/ui/selsect-status";



function page({ params }: { params: { class_id: string } }) {
    const [classId, setClassID] = useState('');
    const [classColor, setClassColor] = useState("rose");
    const [selectedButton, setSelectedButton] = useState(1);

    useEffect(() => {
        setClassID(params.class_id);
    }, [classId]);

    const handleButtonClick = (buttonId: number) => {
        setSelectedButton(buttonId);
    };
    // const getClassRoom = async () => {
    //     try {

    //         // const response = await axios.post('http://localhost:3000/api/get_teacher_room', {
    //         //     id: classId,
    //         // });

    //         // if (response.status === 200) {


    //         // };


    //     } catch (error) {
    //         console.error('Error fetching class room:', error);

    //     } finally {

    //     }
    // }

    return (
        <>
            <div className='grid gap-2 content-center justify-items-center p-5'>
                <div className='bg-primary/5 grid gap-2 justify-items-start rounded-md p-2'>
                    <p className='flex w-full gap-1 font-bold text-xl text-primary bg-primary/10 rounded-md p-2'>
                        <Settings size={25} />
                        Setting Name</p>
                    <div className='w-full p-2 bg-primary/5 flex gap-2'>
                        <Button
                            variant={selectedButton === 1 ? "default" : "outline"} // เปลี่ยนสีถ้าปุ่มนี้ถูกคลิก
                            size={"sm"}
                            onClick={() => handleButtonClick(1)} // กำหนด id ของปุ่มเป็น 1
                            className="w-24"
                        >
                            <Settings2 size={20} />
                            <p>General</p>
                        </Button>

                        <Button
                            variant={selectedButton === 2 ? "default" : "outline"} // เปลี่ยนสีถ้าปุ่มนี้ถูกคลิก
                            size={"sm"}
                            onClick={() => handleButtonClick(2)} // กำหนด id ของปุ่มเป็น 2
                            className="w-24"
                        >
                            <UserRoundCog size={20} />
                            <p>User</p>
                        </Button>

                        <Button
                            variant={selectedButton === 3 ? "default" : "outline"} // เปลี่ยนสีถ้าปุ่มนี้ถูกคลิก
                            size={"sm"}
                            onClick={() => handleButtonClick(3)} // กำหนด id ของปุ่มเป็น 3
                            className="w-24"
                        >
                            <Share2 size={20} />
                            <p>Share</p>
                        </Button>
                    </div>
                    <div>
                        {selectedButton === 1
                            ?
                            (
                                <div>
                                    <div className='flex gap-1'><Settings2 size={20} /><p>General</p></div>
                                    <div className='grid gap-2 p-3 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                                        <div className='grid gap-1'>
                                            <label htmlFor="roomName">Class Name</label>
                                            <div className='flex'>
                                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                    <School size={28} />
                                                </div>
                                                <input onChange={() => { }} className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full' type="text" name="roomName" id="roomName" placeholder='' />
                                            </div>
                                        </div>
                                        <div className='grid gap-1'>
                                            <label htmlFor="classDescription">Class Description</label>
                                            <div className='flex'>
                                                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                                                    <School size={28} />
                                                </div>
                                                <textarea
                                                    onChange={(event) => { }}
                                                    className='rounded-r-sm pl-2 outline-0 border-b-2 border-primary/30 w-full h-16 custom-textarea text-base font-medium'
                                                    name="classDescription"
                                                    id="classDescription"
                                                    placeholder='Enter class description'
                                                />
                                            </div>
                                        </div>
                                        <SelectedStatus message='Permission' onValueChange={(type) => { console.log(type) }} />
                                        <SelectColors onValueChange={(color) => { setClassColor(color) }} />
                                        <SelectSubjectTypes onValueChange={(type) => { console.log(type) }} />
                                        <div className='bg-rose-500/10 p-4 rounded-sm'>
                                            <div className='bg-red-600/50 p-2 rounded-md mb-2'>
                                                <p className='text-center text-md text-white '>Warning Danger Zone!</p>
                                            </div>
                                            <Button
                                                variant={"destructive"}
                                                size={"sm"}
                                                onClick={() => { }}
                                            >
                                                Delect Classroom
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            )
                            : selectedButton === 2
                                ?
                                (
                                    <div>
                                        <div className='flex gap-1'><UserRoundCog size={20} /><p>Users</p></div>
                                        <div className='grid gap-2 p-3 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                                        </div>
                                    </div>
                                )
                                : selectedButton === 3
                                    ?
                                    (
                                        <div>
                                            <div className='flex gap-1'><Share2 size={20} /><p>Share</p></div>
                                            <div className='grid gap-2 p-3 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className='grid gap-2 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                                            "กรุณาเลือกปุ่ม"
                                        </div>
                                    )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default page