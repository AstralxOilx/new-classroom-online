import React, { useState, useEffect } from 'react';
import { LetterText, Ellipsis } from 'lucide-react';

interface TextAreaProps  {
    icon: string;
    name: string;
    label: string;
    value: string;
    placeholder: string;
    onInputChange: (data: string) => void; // เพิ่ม props สำหรับ callback
}

export const inputMappingIcon: Record<string, JSX.Element> = {
    textArea: <LetterText className="text-primary/60" />,
};

export default function TextAreaField({
    icon,
    name,
    label,
    value,
    placeholder,
    onInputChange
}: TextAreaProps ) {
    const [inputData, setInputData] = useState(value); // ตั้งค่าเริ่มต้นจาก props

    useEffect(() => {
        setInputData(value); // อัปเดตค่า inputData ถ้า value เปลี่ยน
    }, [value]);

    // แก้ไขประเภทของ event ให้เป็น HTMLTextAreaElement
    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const data = event.target.value; // เก็บค่าจาก textarea
        setInputData(data);
        onInputChange(data); // ส่งค่ากลับไปยังฟังก์ชันที่เรียกใช้
    };

    return (
        <div className='w-full'>
            <label htmlFor={name}>{label}</label>
            <div className='flex'>
                <div className='border rounded-l-md p-1 text-primary bg-primary/10'>
                    {inputMappingIcon[icon] || <Ellipsis className="text-primary/10" />}
                </div>
                <textarea 
                    className='w-full p-2 border-b outline-0 h-20'
                    name={name} 
                    id={name} 
                    placeholder={placeholder}
                    value={inputData} // ใช้ value
                    onChange={handleTextAreaChange} // ใช้ onChange ที่ถูกต้อง
                />
            </div>
        </div>
    );
}
