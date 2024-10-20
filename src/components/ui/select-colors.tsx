import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Palette } from 'lucide-react';
import { colorMapping } from '@/lib/mappingIcon';

type Color = {
    color_id: number;
    color_name: string;
};

interface ColorSelectProps {
    onColorChange: (color: string) => void; // เพิ่ม props สำหรับ callback
    value: string | undefined;
}

// // colors.ts
// export const colorMapping: Record<string, string> = {
//     Gray: 'bg-gray-600',
//     Orange: 'bg-orange-600',
//     Amber: 'bg-amber-600',
//     Yellow: 'bg-yellow-600',
//     Lime: 'bg-lime-600',
//     Green: 'bg-green-600',
//     Emerald: 'bg-emerald-600',
//     Teal: 'bg-teal-600',
//     Cyan: 'bg-cyan-600',
//     Sky: 'bg-sky-600',
//     Blue: 'bg-blue-600',
//     Indigo: 'bg-indigo-600',
//     Violet: 'bg-violet-600',
//     Purple: 'bg-purple-600',
//     Fuchsia: 'bg-fuchsia-600',
//     Pink: 'bg-pink-600',
//     Rose: 'bg-rose-600',
//     Red: 'bg-red-600',
// };


export default function ColorSelect({ onColorChange ,value}: ColorSelectProps) {
    const [resource] = useState("colors");
    const [colors, setColors] = useState<Color[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(value);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                // สร้าง URL สำหรับเรียก API
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setColors(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchColors();
    }, [resource]); // เรียกใช้ฟังก์ชันเมื่อ table เปลี่ยนแปลง

    useEffect(() => {
        setSelectedColor(value); // อัปเดต selectedRole เมื่อ value เปลี่ยนแปลง
    }, [value]);

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        onColorChange(color);
    };


    return (

        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <Palette size={28} className="text-primary/80"/>
            </div>
                <Select onValueChange={handleColorChange}  value={selectedColor ?? undefined}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                        {colors.map((color) => (
                            <SelectItem key={color.color_id} value={color.color_id.toString()}>
                                <div className='flex gap-2'>
                                    <div className={`w-[40px] h-[20px] ${colorMapping[color.color_name]} rounded-md`}></div>
                                    {color.color_name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
    );
}
