import React, { useState } from 'react';
import {
    Ellipsis, GraduationCap, UsersRound,
    Settings, Share2
} from 'lucide-react';

import { statusMappingIcon, subjectTypeMappingIcon, colorMapping } from '@/lib/mappingIcon';


interface CradDashBoardProps {
    onCradClassRoomChange: (value: number) => void; // เปลี่ยนเป็น number
    onShareClassRoomChange:(value: string) => void;
    onsetSettingClassRoomChange:(value: string) => void;
    className: string | undefined;
    classId: number | undefined;
    color: string | undefined;
    code: string | undefined;
    subject: string | undefined;
    status: string | undefined;
    subjectType: string | undefined;
    teacher_name: string | undefined;
    user_name: string | undefined;
    student_count: number | undefined;
}



export default function CradDashBoard({ 
    onCradClassRoomChange,
    onShareClassRoomChange,
    onsetSettingClassRoomChange,
    className, 
    classId, status, subject, student_count, 
    user_name, teacher_name, subjectType, 
    color ,code,
}: CradDashBoardProps) {
    const [cradClassRoom, setCradClassRoom] = useState<number | null>(null);
    const [share, setShare] = useState<string | null>(null);
    const [setting, setSetting] = useState<string | null>(null);


    const handlesetCrad = (value: number) => {
        setCradClassRoom(value);
        onCradClassRoomChange(value); // ส่งค่า number ไปยัง callback
    };
    const handlesetShare = (value: string) => {
        setShare(value);
        onShareClassRoomChange(value); // ส่งค่า number ไปยัง callback
    };
    const handlesetSetting = (value: string) => {
        setSetting(value);
        onsetSettingClassRoomChange(value); // ส่งค่า number ไปยัง callback
    };

    return (
        <div className='relative  hover:cursor-pointer hover:scale-105 transition-transform duration-300'>
            <div
                className='z-40  w-[22.8rem] h-[12rem] p-2 flex gap-2 items-center rounded-md border-2 border-primary/10 bg-primary/5'
                onClick={() => handlesetCrad(classId ?? 0)}
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
                    <div className='flex items-center justify-between gap-2 mt-5'>
                        <div className='flex items-center gap-2 mt-5'>
                            {subjectTypeMappingIcon[(subjectType ?? '').replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                            {statusMappingIcon[(status ?? '').replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                        </div>
                    </div>
                </div>
            </div>


            <div className='z-50  absolute  bottom-5 right-5 flex items-center gap-2 mt-5'>
                <div className='border border-primary/10 rounded-sm p-1 bg-primary/5  hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                    onClick={() => handlesetSetting(classId?.toString() ?? "noSetting")}
                >
                    <Settings className='text-primary/70' />
                </div>
                <div className='border border-primary/10 rounded-sm p-1 bg-primary/5  hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                    onClick={() => handlesetShare(code ?? "noCode")}
                >
                    <Share2 className='text-primary/70' />
                </div>
            </div>
        </div>
    );
}
