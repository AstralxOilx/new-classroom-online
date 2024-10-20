"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
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
import { toast } from "sonner";
import axios from 'axios';
import InputField from '@/components/ui/input-field';
import SubjectTypeSelect from '@/components/ui/select-subjectType';
import ColorSelect from '@/components/ui/select-colors';
import StuatusSelect from '@/components/ui/select-status';
import SubjectSelect from '@/components/ui/select-subject';
import TextAreaField from '@/components/ui/text-area';
import CradClassRoom from '@/components/ui/crad-classroom';
import { classroomType } from '@/types/classroom-type';




export default function page() {
    const { data: session, status } = useSession()
    const [resource] = useState("student_classroom");
    const [studentClassroom, setStudentClassroom] = useState<classroomType[]>([]);
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [selectedCrad, setSelectedCrad] = useState<number>(); // เก็บค่าที่เลือก
    const [inputData, setInputData] = useState({
        code: '',
    });

    useEffect(() => {
        if (session) {
            setUserID(session.user.id);
            setEmail(session.user.email);
        }
    }, [session]);

    useEffect(() => {
        if (userID) {
            getClassRoom();
        }
    }, [userID, email]);

    // ใช้ฟังก์ชันเดียวในการจัดการอินพุตทุกฟิลด์
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value, // อัปเดตตาม name ของฟิลด์ที่กำลังเปลี่ยน
        }));
    };


    const getClassRoom = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}&user_id=${userID}`);
            setStudentClassroom(response.data.classrooms);
            console.log(response.data.classrooms);
        } catch (error) {
            console.error('Error fetching class room:', error);

        } finally {

        }
    }

    const handleDialogJoined = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/joined_classroom', {
                userID: userID,
                email,
                code: inputData.code,
            });
            toast(response.data.message, {
                description: response.data.className,
                action: {
                    label: "X",
                    onClick: () => console.log("X"),
                },
                className: "text-green-500 shadow-lg p-4 rounded-lg", // เพิ่มสไตล์ที่นี่
                duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
            });
        } catch (error: unknown) {
            // ตรวจสอบว่าข้อผิดพลาดเป็น instance ของ Error
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
                        onClick: () => console.log("X"),
                    },
                    className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                    duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                });
            }
        } finally {
            getClassRoom();
            handleDialogCancel();
        }

    }

    const handleDialogCancel = () => {
        setInputData({
            code: '',
        })
    }

    const handleCradClassRoomChange = (newCrad: number) => {
        setSelectedCrad(newCrad); // อัปเดต state ด้วย number
        console.log('Selected Crad:', newCrad); // ลองพิมพ์ค่าเพื่อดูผล
    };



    return (
        <>
            <div className='grid gap-2 relative mt-10 w-full'>
                <div className="z-40 flex p-1 items-center justify-center bg-secondary  w-full fixed top-32">
                    <p className='text-lg font-bold text-primary/60 '>ClassRoom</p>
                </div>

                <div className="z-50 flex items-center justify-center bg-primary/5 fixed top-40 right-3">
                    <AlertDialog>
                        <AlertDialogTrigger className='p-2 rounded-sm bg-primary text-secondary hover:cursor-pointer hover:scale-105 transition-transform duration-200'>
                            Joined Classroom
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Joined Classroom?</AlertDialogTitle>
                                <AlertDialogDescription></AlertDialogDescription>
                                <div className='grid gap-1'>
                                    <InputField
                                        onInputChange={(data) => handleInputChange({ target: { name: 'code', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                                        type='text'
                                        icon='school'
                                        label='Code ClassRoom'
                                        name='code'
                                        description=''
                                        placeholder='Add a code.'
                                        value={inputData.code}
                                    />
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleDialogCancel}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDialogJoined}>Joined</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                <div className='mt-20 p-3 flex flex-wrap gap-4'>
                    {Array.isArray(studentClassroom) && studentClassroom
                        .filter(room => room.status_id === 2) // กรองเฉพาะห้องเรียนที่มี status_id เท่ากับ 2
                        .map(room => (
                            <div key={room.class_id}>
                                <CradClassRoom
                                    onCradClassRoomChange={handleCradClassRoomChange}
                                    classId={room.class_id}
                                    className={room.class_name}
                                    color={room.color_name}
                                    subject={room.subject_name}
                                    status={room.permission_name}
                                    subjectType={room.subject_type_name}
                                    teacher_name={room.teacher_name}
                                    user_name={room.user_name}
                                    student_count={room.student_count} // แก้ไขเพื่อให้ตรงกับจำนวนที่นับได้
                                />
                            </div>
                        ))}
                </div>

            </div>
        </>
    )
}