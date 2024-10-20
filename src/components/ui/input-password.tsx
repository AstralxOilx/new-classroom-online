import React, { useState, useEffect } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

interface InputProps {
    name: string;
    label: string;
    value: string;
    description: string;
    placeholder: string;
    onPasswordChange: (data: string) => void;
}

export default function InputPassword({
    name,
    label,
    description,
    placeholder,
    value,
    onPasswordChange }: InputProps) {
    const [inputData, setInputData] = useState(value); // ตั้งค่าเริ่มต้นเป็น value จาก props
    const [type, setType] = useState('password');
    
    useEffect(() => {
        setInputData(value); // อัปเดตค่า inputData ถ้า value เปลี่ยน
    }, [value]);

    const handleInputDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        setInputData(data);
        onPasswordChange(data);
    };

    const togglePasswordVisibility = () => {
        setType(type === 'password' ? 'text' : 'password');
    };

    return (
        <div className='w-full'>
            <label htmlFor={name}>{label}</label>
            <div className='relative flex items-center'>
                <div className='border h-10 rounded-l-md p-1 text-primary bg-primary/10'>
                    <KeyRound className="text-primary/60" />
                </div>
                <input
                    className='w-full p-2 border-b outline-0'
                    value={inputData}
                    onChange={handleInputDataChange}
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                />
                <div
                    className='absolute right-2 h-10 w-10 flex items-center justify-center text-primary/60 hover:cursor-pointer'
                    onClick={togglePasswordVisibility}
                >
                    {type === 'password' ? <EyeOff /> : <Eye />}
                </div>
            </div>
            <p className='text-sm text-primary bg-primary/5 border rounded-sm pl-2 mt-1'>{description}</p>
        </div>
    );
}
