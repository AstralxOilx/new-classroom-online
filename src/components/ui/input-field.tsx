import React, { useState, useEffect } from 'react';
import { User, Mail, Ellipsis, IdCard,School } from 'lucide-react';

interface InputProps {
    type: string;
    icon: string;
    name: string;
    label: string;
    value: string;
    description: string;
    placeholder: string;
    onInputChange: (data: string) => void; // เพิ่ม props สำหรับ callback
}

export const inputMappingIcon: Record<string, JSX.Element> = {
    user: <User className="text-primary/60" />,
    mail: <Mail className="text-primary/60" />,
    idCard: <IdCard className="text-primary/60" />,
    school: <School className="text-primary/60" />,
};

export default function InputField({
    type,
    icon,
    name,
    label,
    value,
    description,
    placeholder,
    onInputChange
}: InputProps) {
    const [inputData, setInputData] = useState(value); // ตั้งค่าเริ่มต้นเป็น value จาก props

    useEffect(() => {
        setInputData(value); // อัปเดตค่า inputData ถ้า value เปลี่ยน
    }, [value]);

    const handleInputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value; // เก็บค่าจาก input
        setInputData(data);
        onInputChange(data); // ส่งค่ากลับไปยังฟังก์ชันที่เรียกใช้
    };

    return (
        <div className='w-full'>
            <label htmlFor={name}>{label}</label>
            <div className='flex items-center'>
                <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                    {inputMappingIcon[icon] || <Ellipsis className="text-primary/10" />}
                </div>
                <input
                    className='w-full p-2 border-b outline-0'
                    value={inputData} // ใช้ inputData ที่เก็บค่าปัจจุบัน
                    onChange={handleInputDataChange} // ใช้ onChange แทน
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                />
            </div>
            <p className='text-sm text-primary bg-primary/5 border rounded-sm pl-2 mt-1'>{description}</p>
        </div>
    );
}
