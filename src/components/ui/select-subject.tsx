import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { BookOpenText,Ellipsis } from 'lucide-react';
type subject = {
    subject_id: number;
    subject_name: string;
};

interface SubjectSelectProps {
    onSubjectChange: (subject: string) => void; // เพิ่ม props สำหรับ callback
    value: string | undefined;
}


export default function SubjectSelect({ onSubjectChange,value }: SubjectSelectProps) {
    const [resource] = useState("subjects");
    const [subjects, setSubjects] = useState<subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string | undefined>(value);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                // สร้าง URL สำหรับเรียก API
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchColors();
    }, [resource]); // เรียกใช้ฟังก์ชันเมื่อ table เปลี่ยนแปลง

    useEffect(() => {
        setSelectedSubject(value); // อัปเดต selectedRole เมื่อ value เปลี่ยนแปลง
    }, [value]);

    const handleColorChange = (subject: string) => {
        setSelectedSubject(subject);
        onSubjectChange(subject);
    };


    return (
        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <BookOpenText size={28} className="text-primary/80"/>
            </div>
            <Select onValueChange={handleColorChange} value={selectedSubject ?? undefined}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                    {subjects.map((subject) => (
                        <SelectItem key={subject.subject_id} value={subject.subject_id.toString()}>
                            <div className='flex gap-2'>
                                <Ellipsis  className="text-primary/10"/>
                                {subject.subject_name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
