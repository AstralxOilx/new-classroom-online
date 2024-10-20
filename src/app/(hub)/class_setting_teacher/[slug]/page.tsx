"use client";

import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import {
    Settings, Settings2,
    UserRoundCog, Share2,
    CalendarClock,
    CalendarCog, Save,
} from "lucide-react";
import { toast } from "sonner";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import InputField from '@/components/ui/input-field';
import SubjectTypeSelect from '@/components/ui/select-subjectType';
import ColorSelect from '@/components/ui/select-colors';
import StuatusSelect from '@/components/ui/select-status';
import SubjectSelect from '@/components/ui/select-subject';
import TextAreaField from '@/components/ui/text-area';
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
} from "@/components/ui/alert-dialog"



export default function Page({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const {  data: session, status } = useSession();
    const [classId, setClassId] = useState(params.slug);
    const [resource] = useState("classSetting");
    const [selectedButton, setSelectedButton] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [inputData, setInputData] = useState({
        user_id: '',
        className: '',
        description: '',
        color: '',
        status: '',
        subject: '',
        subjectType: '',
        created_at: '',
        updated_at: '',
    });


    useEffect(() => {
        if (session?.user?.id) {
            fetchData();
        }
    }, [session]); // เพิ่ม session เป็น dependency

    const handleButtonClick = (buttonId: number) => {
        setSelectedButton(buttonId);

    };
    // ใช้ฟังก์ชันเดียวในการจัดการอินพุตทุกฟิลด์
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value, // อัปเดตตาม name ของฟิลด์ที่กำลังเปลี่ยน
        }));
    };


    const fetchData = async () => {
        try {

            const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}&class_id=${classId}&user_id=${session?.user?.id}`);
            const classroom = response.data;
           
            setInputData({
                user_id: classroom.user_id?.toString() || '',
                className: classroom.class_name || '',  // แมพจาก class_name
                description: classroom.description || '',  // แมพจาก description
                color: classroom.color_id?.toString() || '',  // แมพจาก color_id (แปลงเป็น string)
                status: classroom.permission_id?.toString() || '',  // แมพจาก permission_id (แปลงเป็น string)
                subject: classroom.subject_id?.toString() || '',  // แมพจาก subject_id (แปลงเป็น string)
                subjectType: classroom.subject_type_id?.toString() || '',  // แมพจาก subject_type_id (แปลงเป็น string)
                created_at: classroom.created_at ? new Date(classroom.created_at).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : '',
                updated_at: classroom.updated_at ? new Date(classroom.updated_at).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : '',
            });
        } catch (error) {
           router.push('/dashboard');

        } finally {
            setIsLoading(false);
           
        }
    }





    return (
        <>
            <div className='grid gap-2 content-center justify-items-center p-5 '>
                <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Loading....</AlertDialogTitle>
                            <AlertDialogDescription className='flex gap-2'>
                                <LoaderCircle size={30} className='animate-spin' />
                                <span>Currently Loading. Please wait...</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                <div className='relative bg-primary/5 grid gap-2 justify-items-start rounded-md p-2 w-[300px] sm:w-[700px] min-w-[350px] max-w-[900px]'>
                    <p className='flex w-full gap-1 font-bold text-xl text-primary bg-primary/10 rounded-md p-2'>
                        <Settings size={25} />
                        Setting ClassRoom
                    </p>
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
                    <div className='w-full'>

                        {selectedButton === 1
                            ?
                            (
                                <div className='grid gap-2'>

                                    <div className='bg-green-700/10 p-2 rounded-md grid gap-2 justify-items-end'>
                                        <div>
                                            <AlertDialog>
                                                <AlertDialogTrigger
                                                    className='flex gap-2 w-full bg-green-700 p-2 rounded-md text-white hover:bg-green-600'
                                                >
                                                    <Save />
                                                    <p>Updated</p>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className='bg-green-800 text-white'>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely Updated sure?</AlertDialogTitle>
                                                        <AlertDialogDescription className='text-white'>
                                                            This action cannot be undone. This will permanently delete your account
                                                            and remove your data from our servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className='text-black bg-white hover:bg-white/80'>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction className='bg-green-700 hover:bg-green-600 text-white'>Updated</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </div>
                                    </div>
                                    <InputField
                                        onInputChange={(data) => handleInputChange({ target: { name: 'className', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                                        type='text'
                                        icon='school'
                                        label='ClassRoom Name'
                                        name='className'
                                        description=''
                                        placeholder='Add a classroom name.'
                                        value={inputData.className}
                                    />
                                    <TextAreaField
                                        onInputChange={(data) => handleInputChange({ target: { name: 'description', value: data } } as React.ChangeEvent<HTMLTextAreaElement>)}
                                        value={inputData.description}
                                        icon='textArea'
                                        label='Description'
                                        name='description'
                                        placeholder='description'
                                    />
                                    <ColorSelect
                                        onColorChange={(data) => handleInputChange({ target: { name: 'color', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.color}
                                    />
                                    <StuatusSelect
                                        onStatusChange={(data) => handleInputChange({ target: { name: 'stuatus', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.status}
                                    />
                                    <SubjectTypeSelect
                                        onSubjectTypeChange={(data) => handleInputChange({ target: { name: 'subjectType', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.subjectType}
                                    />
                                    <SubjectSelect
                                        onSubjectChange={(data) => handleInputChange({ target: { name: 'subject', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.subject}
                                    />
                                    <div className='flex gap-2 p-2 border border-primary/10 rounded-sm bg-primary/5'>
                                        <CalendarClock />
                                        <p>Created</p>
                                        <p>{inputData.created_at}</p>
                                    </div>
                                    <div className='flex gap-2 p-2 border border-primary/10 rounded-sm bg-primary/5'>
                                        <CalendarCog />
                                        <p>Updated</p>
                                        <p>{inputData.updated_at}</p>
                                    </div>
                                    <div className='bg-rose-700/10 p-2 rounded-md grid gap-2'>
                                        <p className='text-md text-red-700 font-bold'>Danger Zone</p>
                                        <AlertDialog>
                                            <AlertDialogTrigger
                                                className='w-full bg-red-700 p-2 rounded-sm text-white/80 hover:bg-red-600'
                                            >
                                                Remove
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className='bg-red-800 text-white'>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely Remove sure?</AlertDialogTitle>
                                                    <AlertDialogDescription className='text-white'>
                                                        This action cannot be undone. This will permanently delete your account
                                                        and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className='text-black bg-white hover:bg-white/80'>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className='bg-red-700 hover:bg-red-600 text-white'>Remove</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>

                                    </div>
                                </div>
                            )
                            : selectedButton === 2
                                ?
                                (
                                    <div>

                                    </div>
                                )
                                : selectedButton === 3
                                    ?
                                    (
                                        <div>

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

