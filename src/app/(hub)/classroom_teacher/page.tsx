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
    const [resource] = useState("teacher_classroom");
    const [teacherClassroom, setTeacherClassroom] = useState<classroomType[]>([]);
    const [studentClassroom, setStudentClassroom] = useState<classroomType[]>([]);
    const [userID, setUserID] = useState("");
    const [email, setEmail] = useState("");
    const [selectedCrad, setSelectedCrad] = useState<number>(); // เก็บค่าที่เลือก
    const [inputData, setInputData] = useState({
        className: '',
        description: '',
        color: '',
        stuatus: '',
        subject: '',
        subjectType: '',
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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value, // อัปเดตตาม name ของฟิลด์ที่กำลังเปลี่ยน
        }));
    };


    const getClassRoom = async () => {
        try {
            // รอผลลัพธ์จาก API ทั้งสองตัวพร้อมกัน
            const [teacherResponse, studentResponse] = await Promise.all([
                axios.get(`http://localhost:3000/api/get_resource?resource=${resource}&user_id=${userID}`),
                axios.get(`http://localhost:3000/api/get_resource?resource=student_classroom&user_id=${userID}`)
            ]);

            // ตั้งค่าข้อมูลห้องเรียนที่ผู้สอนสอน
            setTeacherClassroom(teacherResponse.data.classrooms);
            // ตั้งค่าข้อมูลห้องเรียนที่นักเรียนเข้าร่วม
            setStudentClassroom(studentResponse.data.classrooms);
        } catch (error) {
            console.error('Error fetching class room:', error);

        } finally {

        }
    }

    const handleDialogCreated = async () => {
        const { className, description, color, stuatus, subject, subjectType } = inputData;
        if (className) {
            try {
                const response = await axios.post('http://localhost:3000/api/created_classroom', {
                    userID: userID,
                    email,
                    className,
                    description,
                    color: color,
                    roomStuatus: stuatus,
                    subject,
                    subjectType,
                });
                toast("Classroom created successfully!", {
                    description: className,
                    action: {
                        label: "X",
                        onClick: () => console.log("X"),
                    },
                    className: "text-green-500 shadow-lg p-4 rounded-lg", // เพิ่มสไตล์ที่นี่
                    duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                });
            } catch (error) {
                toast("Error Event has been created Name: ", {
                    description: "Unauthorized: Only teachers can create classrooms.",
                    action: {
                        label: "X",
                        onClick: () => console.log("X"),
                    },
                    className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
                    duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
                });
            } finally {
                getClassRoom();
                handleDialogCancel();
            }
        } else {
            handleDialogCancel();
            toast("Error Event has been created Name: ", {
                description: "Invalid Class Name",
                action: {
                    label: "X",
                    onClick: () => console.log("X"),
                },
                className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg",
                duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
            });
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
            className: '',
            description: '',
            color: '',
            stuatus: '',
            subject: '',
            subjectType: '',
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

                <div className="z-50 flex gap-2 items-center justify-center bg-primary/5 fixed top-40 right-3">
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
                    <AlertDialog>
                        <AlertDialogTrigger className='p-2 rounded-sm bg-primary text-secondary hover:cursor-pointer hover:scale-105 transition-transform duration-200'>
                            Created Classroom
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Created Classroom?</AlertDialogTitle>
                                <AlertDialogDescription></AlertDialogDescription>
                                <div className='grid gap-1'>
                                    <InputField
                                        onInputChange={(data) => handleInputChange({ target: { name: 'className', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                                        type='text'
                                        icon='school'
                                        label='Classroom Name'
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
                                        value={inputData.stuatus}
                                    />
                                    <SubjectTypeSelect
                                        onSubjectTypeChange={(data) => handleInputChange({ target: { name: 'subjectType', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.subjectType}
                                    />
                                    <SubjectSelect
                                        onSubjectChange={(data) => handleInputChange({ target: { name: 'subject', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                                        value={inputData.subject}
                                    />
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleDialogCancel}>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDialogCreated}>Created</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>


                <div className='mt-20 p-2 flex flex-wrap gap-4'>
                    {Array.isArray(teacherClassroom) && teacherClassroom
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
                                    student_count={room.student_count} // แสดงจำนวนในห้องเรียน
                                />
                            </div>
                        ))}
                    {Array.isArray(studentClassroom) && studentClassroom
                        .filter(room => room.status_id === 2 ) // กรองเฉพาะห้องเรียนที่ตรงตามเงื่อนไข
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
                                    student_count={room.student_count} // จำนวนที่นับได้
                                />
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}