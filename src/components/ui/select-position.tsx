import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';

import { Ellipsis,BookUp2 } from 'lucide-react';

type position = {
    position_id: number;
    position_name: string;
};

interface PositionSelectProps {
    onPositionChange: (position: string) => void; // เพิ่ม props สำหรับ callback
}





export default function PositionSelect({ onPositionChange }: PositionSelectProps) {
    const [resource] = useState("positions");
    const [position, setPosition] = useState<position[]>([]);
    const [selectedPposition, setSelectedPosition] = useState<string | null>(null);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                // สร้าง URL สำหรับเรียก API
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setPosition(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchColors();
    }, [resource]); // เรียกใช้ฟังก์ชันเมื่อ table เปลี่ยนแปลง


    const handlesetSubjectChange = (position: string) => {
        setSelectedPosition(position);
        onPositionChange(position);
    };


    return (
        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <BookUp2 size={28} className="text-primary/80"/>
            </div>
            <Select onValueChange={handlesetSubjectChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Subject Types" />
                </SelectTrigger>
                <SelectContent>
                    {position.map((position) => (
                        <SelectItem key={position.position_id} value={position.position_id.toString()}>
                            <div className='flex gap-2'>
                                <Ellipsis className="text-primary/10" />
                                {position.position_name}
                            </div>
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
}
