import React, { useState, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Ellipsis, Layers2 } from 'lucide-react';

type Role = {
    role_id: number;
    role_name: string;
};

interface RoleSelectProps {
    onRoleChange: (role: string) => void; // เพิ่ม props สำหรับ callback
    value: string | undefined; // เปลี่ยนเป็น string | undefined
}

export default function RoleSelect({ onRoleChange, value }: RoleSelectProps) {
    const [resource] = useState("roles");
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | undefined>(value); // เปลี่ยนเป็น string | undefined

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}`);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRoles();
    }, [resource]);

    useEffect(() => {
        setSelectedRole(value); // อัปเดต selectedRole เมื่อ value เปลี่ยนแปลง
    }, [value]);

    const handleSetRoleChange = (role: string) => {
        setSelectedRole(role);
        onRoleChange(role);
    };

    return (
        <div className='w-full flex items-center'>
            <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                <Layers2 size={28} className="text-primary/60" />
            </div>
            <Select onValueChange={handleSetRoleChange} value={selectedRole ?? undefined}> {/* ใช้ ?? เพื่อแปลง null เป็น undefined */}
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Role" />
                </SelectTrigger>
                <SelectContent>
                    {roles.map((role) => (
                        <SelectItem key={role.role_id} value={role.role_id.toString()}>
                            <div className='flex gap-2'>
                                <Ellipsis className="text-primary/10" />
                                {role.role_name}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
