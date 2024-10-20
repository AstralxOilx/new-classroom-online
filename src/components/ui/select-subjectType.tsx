import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import {subjectTypeMappingIcon} from '@/lib/mappingIcon';
import { Ellipsis,BookType } from 'lucide-react';

type subjectType = {
    subject_type_id: number;
    subject_type_name: string;
};

interface SubjectTypeSelectProps {
    onSubjectTypeChange: (subjectType: string) => void; // เพิ่ม props สำหรับ callback
    value: string | undefined;
}





export default function SubjectTypeSelect({ onSubjectTypeChange,value }: SubjectTypeSelectProps) {
    const [resource] = useState("subjectTypes");
    const [subjectTypes, setSubjectTypes] = useState<subjectType[]>([]);
    const [selectedSubjectType, setSelectedSubjectType] = useState<string | undefined>(value);
    

    useEffect(() => {
        const fetchColors = async () => {
            try {
                // สร้าง URL สำหรับเรียก API
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setSubjectTypes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchColors();
    }, [resource]); // เรียกใช้ฟังก์ชันเมื่อ table เปลี่ยนแปลง

    useEffect(() => {
        setSelectedSubjectType(value); // อัปเดต selectedRole เมื่อ value เปลี่ยนแปลง
    }, [value]);

    const handlesetSubjectTypeChange = (subjectType: string) => {
        setSelectedSubjectType(subjectType);
        onSubjectTypeChange(subjectType);
    };


    return (
        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <BookType size={28} className="text-primary/80"/>
            </div>
            <Select onValueChange={handlesetSubjectTypeChange} value={selectedSubjectType ?? undefined}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Subject Types" />
                </SelectTrigger>
                <SelectContent>
                    {subjectTypes.map((subjectType) => (
                        <SelectItem key={subjectType.subject_type_id} value={subjectType.subject_type_id.toString()}>
                            <div className='flex gap-2'>
                                {subjectTypeMappingIcon[subjectType.subject_type_name.replace(/\s+/g, '')] || <Ellipsis className="text-primary/10" />}
                                {subjectType.subject_type_name}
                            </div>
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    );
}
