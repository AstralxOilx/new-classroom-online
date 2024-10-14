import React, { useState } from 'react';
import { Status } from '@prisma/client';
import { statusTypeMapping, StatusIcon } from '@/lib/statusType';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BadgeInfo } from "lucide-react";

interface SelectSubjectTypesProps {
    onValueChange?: (type: string) => void; // รับ callback เพื่อส่งค่า
    message:string;
}

const statusEnum = Object.values(Status);
const formatWithSpaces = (text: string) => {
    return text.replace(/([A-Z])/g, ' $1').trim();
};

const SelectedStatus: React.FC<SelectSubjectTypesProps> = ({ onValueChange,message }) => {
    const [selectedStatus, setSelectedStatus] = useState(''); // แก้ไขชื่อ state

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        if (onValueChange) {
            onValueChange(status); // ส่งค่าประเภทที่เลือกออกไป
        }
    };

    return (
        <div>
            <p>{message}</p>
            <div className='flex'>
                <div className='bg-primary/20 p-1 rounded-l-sm text-primary/60'>
                    <BadgeInfo size={28} />
                </div>
                <Select onValueChange={handleStatusChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Subject Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusEnum.map((status) => (
                            <SelectItem key={status} value={status}>
                                <div className='flex gap-2 items-center'>
                                <StatusIcon statusType={status as keyof typeof statusTypeMapping} />
                                {formatWithSpaces(status.charAt(0).toUpperCase() + status.slice(1))}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export { SelectedStatus };
