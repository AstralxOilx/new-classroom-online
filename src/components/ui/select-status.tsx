import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {statusMappingIcon} from '@/lib/mappingIcon';
import axios from 'axios';

import { Ellipsis,ChartPie } from 'lucide-react';

type status = {
    status_id: number;
    status_name: string;
};

interface StuatusSelectProps {
    onStatusChange: (status: string) => void; // เพิ่ม props สำหรับ callback
    value: string | undefined;
}



export default function StuatusSelect({ onStatusChange ,value}: StuatusSelectProps) {
    const [resource] = useState("statuses");
    const [status, setStuatus] = useState<status[]>([]);
    const [selectedStuatus, setSelectedStuatus] =useState<string | undefined>(value);
    useEffect(() => {
        const fetchColors = async () => {
            try {
                // สร้าง URL สำหรับเรียก API
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setStuatus(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchColors();
    }, [resource]); // เรียกใช้ฟังก์ชันเมื่อ table เปลี่ยนแปลง

    useEffect(() => {
        setSelectedStuatus(value); // อัปเดต selectedRole เมื่อ value เปลี่ยนแปลง
    }, [value]);

    const handlesetSubjectChange = (status: string) => {
        setSelectedStuatus(status);
        onStatusChange(status);
    };


    return (
        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <ChartPie size={28} className="text-primary/80"/>
            </div>
            <Select onValueChange={handlesetSubjectChange}  value={selectedStuatus ?? undefined}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Subject Types" />
                </SelectTrigger>
                <SelectContent>
                    {status.map((status) => (
                        <SelectItem key={status.status_id} value={status.status_id.toString()}>
                            <div className='flex gap-2'>
                                {statusMappingIcon[status.status_name.replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                                {status.status_name}
                            </div>
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
}
