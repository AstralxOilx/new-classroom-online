import React, { useState } from 'react';
import {
    Ellipsis, GraduationCap, UsersRound
} from 'lucide-react';

import { statusMappingIcon, subjectTypeMappingIcon, colorMapping } from '@/lib/mappingIcon';


interface CradClassRoomProps {
    onCradClassRoomChange: (value: number) => void; // เปลี่ยนเป็น number
    className: string | undefined;
    classId: number | undefined;
    color: string | undefined;
    subject: string | undefined;
    status: string | undefined;
    subjectType: string | undefined;
    teacher_name: string | undefined;
    user_name: string | undefined;
    student_count: number | undefined;
}



export default function CradClassRoom({ 
    onCradClassRoomChange, className, 
    classId, status, subject, student_count, 
    user_name, teacher_name, subjectType, color 
}: CradClassRoomProps) {
    const [cradClassRoom, setCradClassRoom] = useState<number | null>(null); // เปลี่ยนเป็น number | null

    const handlesetCrad = (value: number) => {
        setCradClassRoom(value);
        onCradClassRoomChange(value); // ส่งค่า number ไปยัง callback
    };

    return (
        <div
            className='w-[22.8rem] h-[12rem] p-2 flex gap-2 items-center rounded-md border-2 border-primary/10 bg-primary/5 hover:cursor-pointer hover:scale-105 transition-transform duration-300'
            onClick={() => handlesetCrad(classId ?? 0)}  // ถ้า classId เป็น undefined จะใช้ 0 แทน
        >
            <div className={`${colorMapping[color ?? "gray"]} w-[12rem] h-[10rem] border-2 border-primary/10 rounded-md flex items-center justify-center`}>
                <p className='text-7xl text-white/90 font-bold'>{className?.slice(0, 2).toUpperCase()}</p>
            </div>
            <div className='grid gap-2'>
                <div className='w-[150px] '>
                    <p className='text-2xl text-secondary-foreground/80 font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{className}</p>
                </div>

                <div className='flex items-center justify-between gap-1  text-primary/50'>
                    <div className='flex items-center gap-1 w-[120px]'>
                        <GraduationCap size={28} />
                        {
                            user_name === teacher_name
                                ?
                                <p className='w-20 text-md  font-bold  overflow-hidden text-ellipsis whitespace-nowrap'>You</p>
                                :
                                <p className='w-20 text-md font-bold  overflow-hidden text-ellipsis whitespace-nowrap'>{teacher_name}</p>
                        }

                    </div>
                    <div className='flex items-center justify-end gap-1'>
                        <UsersRound className="text-primary/50" />
                        <p className='w-10 text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap'>{student_count}</p>
                    </div>
                </div>
                <div className='flex items-center justify-end gap-2 mt-5'>
                    {subjectTypeMappingIcon[(subjectType ?? '').replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                    {statusMappingIcon[(status ?? '').replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                </div>
            </div>
        </div>
    );
}
