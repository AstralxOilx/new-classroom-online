
import { subjectTypeMapping, SubjectIcon } from '@/lib/subjectType';
import { Settings, UserRound, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { ColorType } from '@/types/color-types';


interface ClassRoomCardProps {
    Name: string;
    Description: string;
    Color: string;
    Icon: string;
    classId: Number;
    onClickCard?: () => void;
    onClickSetting?: () => void;
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




const ClassRoomCard: React.FC<ClassRoomCardProps> = ({ classId, Name, Description, Color, Icon, onClickCard }) => {
    const [selectedColor, setSelectedColor] = useState<ColorType>(Color as ColorType);

    return (
        <div
            className='grid gap-2 content-center justify-items-center  h-52 w-[18rem] bg-primary/5 m-3 rounded-md border border-primary/10 hover:cursor-pointer hover:scale-105 transition-transform duration-300'
            onClick={onClickCard} // เรียกใช้ฟังก์ชันเมื่อมีการคลิก
        >
            <div className='flex gap-2 justify-center items-center'>
                <div className={` ${colorCode(selectedColor)} grid gap-2 content-center justify-items-center p-1 w-[7rem] h-[7rem] text-clip overflow-hidden rounded-lg border`}>
                    <p className='text-5xl text-white/80 font-bold'>{Name.slice(0, 2).toUpperCase()}</p>
                </div>
                <div>
                    <div className='grid gap-2 w-[7rem] h-10 text-clip overflow-hidden'>
                        <p className='text-center text-2xl font-bold overflow-hidden whitespace-nowrap text-ellipsis'>
                            {Name}
                        </p>
                    </div>
                    <div className='flex gap-2 justify-center items-center text-clip overflow-hidden'>
                        <div className='border-2 border-primary/10 p-1 rounded-sm text-primary/60'>
                            <SubjectIcon subjectType={Icon as keyof typeof subjectTypeMapping} />
                        </div>
                        <p className='text-center text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis'>{Icon}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ClassRoomCardDashBoard: React.FC<ClassRoomCardProps> = ({ classId, Name, Description, Color, Icon, onClickCard, onClickSetting }) => {

    const [selectedColor, setSelectedColor] = useState<ColorType>(Color as ColorType);
    const router = useRouter();

    return (
        <>
            <div className="relative">
                <div className='flex gap-2 justify-center items-center  h-52 w-[18rem] bg-primary/5 m-3 rounded-md border border-primary/10 hover:cursor-pointer transition-transform duration-300'
                    onClick={onClickCard}>
                    <div className={`${colorCode(selectedColor)} grid gap-2 content-center justify-items-center p-1 w-[7rem] h-[7rem] text-clip overflow-hidden rounded-lg border`}>
                        <p className='text-5xl text-white/80 font-bold'>{Name.slice(0, 2).toUpperCase()}</p>
                    </div>
                    <div>
                        <div className='grid gap-2 w-[7rem] h-10 text-clip overflow-hidden'>
                            <p className='text-center text-2xl  font-bold overflow-hidden whitespace-nowrap text-ellipsis'>
                                {Name}
                            </p>
                        </div>
                        <div className='flex gap-2 justify-center items-center text-clip overflow-hidden'>
                            <div className='border-2 border-primary/10 p-1 rounded-sm  text-primary/60'>
                                <SubjectIcon subjectType={Icon as keyof typeof subjectTypeMapping} />
                            </div>
                            <p className='text-center text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis'>{Icon}</p>
                        </div>
                    </div>
                </div>
                <div onClick={() => {
                      router.push(`/setting?classId=${classId}`);
                }}
                    className="absolute  bottom-3 right-5 w-10 h-10 bg-primary/10 grid content-center justify-items-center rounded-sm hover:cursor-pointer hover:scale-105 transition-transform duration-300">
                    <Settings className="text-primary" size={25} />
                </div>
                <div onClick={() => { console.log("ID: ", classId, " Name: ", Name, " Color: ") }}
                    className="absolute  bottom-3 right-16 w-10 h-10 bg-primary/10 grid content-center justify-items-center rounded-sm hover:cursor-pointer hover:scale-105 transition-transform duration-300">
                    <Share2 className="text-primary" size={25} />
                </div>
                <div
                    className="absolute bg-primary/5 p-1 bottom-2 left-10 rounded-sm w-15 h-10 flex gap-1 justify-center items-center">
                    <UserRound className="text-primary" size={25} />
                    <p className='text-sm'>0</p>
                </div>
            </div>
        </>
    );
};

export { ClassRoomCard, ClassRoomCardDashBoard };