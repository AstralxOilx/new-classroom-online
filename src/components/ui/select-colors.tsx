import React, { useState, useEffect } from 'react';
import { ColorType } from '@/types/color-types';
import { Colors } from '@prisma/client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Palette } from "lucide-react";

interface ClassRoomCardProps {
    onValueChange?: (color: string) => void; // รับ callback เพื่อส่งค่า
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

const ColorsEnum = Object.values(Colors);

const SelectColors: React.FC<ClassRoomCardProps> = ({ onValueChange }) => {
    const [classColor, setClassColor] = useState("rose");

    const handleColorChange = (color: string) => {
        setClassColor(color);
        if (onValueChange) {
            onValueChange(color); // ส่งค่าสีที่ถูกเลือกออกไป
        }
    };

    return (
        <>
            <div>
                <p>Color</p>
                <div className='flex'>
                    <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                        <Palette size={28} />
                    </div>
                    <Select onValueChange={handleColorChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Color" />
                        </SelectTrigger>
                        <SelectContent>
                            {ColorsEnum.map((color) => (
                                <SelectItem key={color} value={color}>
                                    <div className='flex gap-2 items-center'>
                                        <div className={`w-[40px] h-[20px] rounded-lg ${colorCode(color as ColorType)}`} />
                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
};

export { SelectColors };
