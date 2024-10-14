import React, { useState } from 'react';
import { SubjectType } from '@prisma/client';
import { subjectTypeMapping, SubjectIcon } from '@/lib/subjectType';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Wrench } from "lucide-react";

interface SelectSubjectTypesProps {
    onValueChange?: (type: string) => void; // รับ callback เพื่อส่งค่า
}

const SubjectTypeEnum = Object.values(SubjectType);
const formatWithSpaces = (text: string) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
};

const SelectSubjectTypes: React.FC<SelectSubjectTypesProps> = ({ onValueChange }) => {
    const [selectedSubjectType, setSelectedSubjectType] = useState(''); // แก้ไขชื่อ state

    const handleSubjectTypeChange = (type: string) => {
        setSelectedSubjectType(type);
        if (onValueChange) {
            onValueChange(type); // ส่งค่าประเภทที่เลือกออกไป
        }
    };

    return (
        <div>
            <p>Subject Type</p>
            <div className='flex'>
                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                    <Wrench size={28} />
                </div>
                <Select onValueChange={handleSubjectTypeChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Subject Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {SubjectTypeEnum.map((type) => (
                            <SelectItem key={type} value={type}>
                                <div className='flex gap-2 items-center'>
                                <SubjectIcon subjectType={type as keyof typeof subjectTypeMapping} />
                                {formatWithSpaces(type.charAt(0).toUpperCase() + type.slice(1))}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export { SelectSubjectTypes };
