"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { Share2, Clipboard, X, Settings } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from 'axios';
import InputField from '@/components/ui/input-field';
import SubjectTypeSelect from '@/components/ui/select-subjectType';
import ColorSelect from '@/components/ui/select-colors';
import StuatusSelect from '@/components/ui/select-status';
import SubjectSelect from '@/components/ui/select-subject';
import TextAreaField from '@/components/ui/text-area';
import CradDashBoard from '@/components/ui/crad-dashboard';
import { classroomType } from '@/types/classroom-type';
import { Button } from '@/components/ui/button';

export default function page() {
  const { data: session, status } = useSession()
  const [resource] = useState("teacher_classroom");
  const [teacherClassroom, setTeacherClassroom] = useState<classroomType[]>([]);
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [isShare, setIsShare] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedCrad, setSelectedCrad] = useState<number>();
  const [selectedShare, setSelectedShare] = useState('');
  const [inputData, setInputData] = useState({
    className: '',
    description: '',
    color: '',
    stuatus: '',
    subject: '',
    subjectType: '',
  });

  useEffect(() => {
    if (session) {
      setUserID(session.user.id);
      setEmail(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (userID) {
      getClassRoom();
    }
  }, [userID, email]);

  // ใช้ฟังก์ชันเดียวในการจัดการอินพุตทุกฟิลด์
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value, // อัปเดตตาม name ของฟิลด์ที่กำลังเปลี่ยน
    }));
  };


  const getClassRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get_resource?resource=${resource}&user_id=${userID}`);
      setTeacherClassroom(response.data.classrooms);

    } catch (error) {
      console.error('Error fetching class room:', error);

    } finally {

    }
  }

  const handleDialogCreated = async () => {
    const { className, description, color, stuatus, subject, subjectType } = inputData;
    if (className) {
      try {
        const response = await axios.post('http://localhost:3000/api/created_classroom', {
          userID: userID,
          email,
          className,
          description,
          color: color,
          roomStuatus: stuatus,
          subject,
          subjectType,
        });
        toast("Classroom created successfully!", {
          description: className,
          action: {
            label: "X",
            onClick: () => console.log("X"),
          },
          className: "text-green-500 shadow-lg p-4 rounded-lg", // เพิ่มสไตล์ที่นี่
          duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
        });
      } catch (error) {
        toast("Error Event has been created Name: ", {
          description: "Unauthorized: Only teachers can create classrooms.",
          action: {
            label: "X",
            onClick: () => console.log("X"),
          },
          className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg", // เพิ่มสไตล์ที่นี่
          duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
        });
      } finally {
        getClassRoom();
      }
    } else {
      toast("Error Event has been created Name: ", {
        description: "Invalid Class Name",
        action: {
          label: "X",
          onClick: () => console.log("X"),
        },
        className: "text-red-500 shadow-lg p-4 rounded-lg shadow-lg",
        duration: 5000, // กำหนดเวลาที่ toast จะแสดง (5000ms = 5 วินาที)
      });
    }

  }

  const handleDialogCancel = () => {
    setInputData({
      className: '',
      description: '',
      color: '',
      stuatus: '',
      subject: '',
      subjectType: '',
    })
  }

  const handleCradClassRoomChange = (newCrad: number) => {
    setSelectedCrad(newCrad); // อัปเดต state ด้วย number
    console.log('Selected Crad:', newCrad); // ลองพิมพ์ค่าเพื่อดูผล
  };
  const handleShareClassRoomChange = (share: string) => {
    setSelectedShare(share); // อัปเดต state ด้วย number
    setIsShare(true);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedShare);
    setCopied(true); // แสดงข้อความว่าคัดลอกสำเร็จ
    setTimeout(() => setCopied(false), 3000);
  };
  const handleSettingClassRoomChange = (share: string) => {
    console.log(share); // ตรวจสอบว่า share มีค่า
    setIsSetting(true);
  };

  return (
    <>
      <div className='grid gap-2 relative mt-10'>
        <div className="flex p-1 items-center justify-center bg-primary/5  w-full fixed top-32">
          <p className='text-lg font-bold text-primary/60 '>Dashboard</p>
        </div>

        <div className="flex items-center justify-center bg-primary/5 fixed top-40 right-3">
          <AlertDialog>
            <AlertDialogTrigger className='p-2 rounded-sm bg-primary text-secondary hover:scale-105 transition-transform duration-200'>Created Classroom</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Created Classroom?</AlertDialogTitle>
                <AlertDialogDescription></AlertDialogDescription>
                <div className='grid gap-1'>
                  <InputField
                    onInputChange={(data) => handleInputChange({ target: { name: 'className', value: data } } as React.ChangeEvent<HTMLInputElement>)}
                    type='text'
                    icon='school'
                    label='Classroom Name'
                    name='className'
                    description=''
                    placeholder='Add a classroom name.'
                    value={inputData.className}
                  />
                  <TextAreaField
                    onInputChange={(data) => handleInputChange({ target: { name: 'description', value: data } } as React.ChangeEvent<HTMLTextAreaElement>)}
                    value={inputData.description}
                    icon='textArea'
                    label='Description'
                    name='description'
                    placeholder='description'
                  />
                  <ColorSelect
                    onColorChange={(data) => handleInputChange({ target: { name: 'color', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                    value={inputData.color}
                  />
                  <StuatusSelect
                    onStatusChange={(data) => handleInputChange({ target: { name: 'stuatus', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                    value={inputData.stuatus}
                  />
                  <SubjectTypeSelect
                    onSubjectTypeChange={(data) => handleInputChange({ target: { name: 'subjectType', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                    value={inputData.subjectType}
                  />
                  <SubjectSelect
                    onSubjectChange={(data) => handleInputChange({ target: { name: 'subject', value: data } } as React.ChangeEvent<HTMLSelectElement>)}
                    value={inputData.subject}
                  />
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleDialogCancel}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDialogCreated}>Created</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <AlertDialog open={isShare}>
          <AlertDialogContent>
            <AlertDialogHeader className='w-full'>
              <AlertDialogTitle className='flex gap-2'>
                <Share2 size={25} />
                <p>
                  Share Classroom
                </p>
              </AlertDialogTitle>
              {copied && <span className="text-green-600">
                Successfully copied!
              </span>}
              <AlertDialogDescription className='grid gap-2 items-center w-full'>
                <span className="pt-2 pb-2 pl-1 pr-1 w-full rounded-md overflow-x-auto bg-primary/5 border-2 overflow-hidden whitespace-nowrap">
                  <span className="animate-slide scroll-ml-6 snap-start">
                    {selectedShare}
                  </span>
                </span>
                <Button
                  className='border-2'
                  variant={"ghost"}
                  size={"default"}
                  onClick={handleCopy} >
                  <Clipboard size={25} /><span>Copy</span>
                </Button>
                <Button
                  className='border-2'
                  variant={"ghost"}
                  size={"default"}
                  onClick={() => { setIsShare(false) }} >
                  <X size={25} />
                  <span>Colse</span>
                </Button>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isSetting}>
          <AlertDialogContent className='bg-background max-w-lg w-full mx-auto'>
            <div className='flex justify-between items-center p-2'>
              <div className='flex gap-2 items-center'>
                <Settings size={24} className='text-primary/80' />
                <p className='font-bold text-lg'>Setting Classroom</p>
              </div>
              <Button
                className='border-2'
                variant={"secondary"}
                size={"icon"}
                onClick={() => { setIsSetting(false) }} >
                <X size={20} />
              </Button>
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-sm'>
                {/* เพิ่มชื่อที่นี่ถ้าต้องการ */}
              </AlertDialogTitle>
              <AlertDialogDescription className='text-xs'>
                {/* เพิ่มคำอธิบายที่นี่ถ้าต้องการ */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className='h-96 md:h-[25rem] lg:h-[35rem] overflow-y-auto'>
              <div className='h-[100rem] w-32'>
                {/* เนื้อหาของคุณ */}
              </div>
            </div>
            <AlertDialogFooter className='p-2'>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>



        <div className='mt-20 p-2 flex  flex-wrap gap-4'>
          {
            Array.isArray(teacherClassroom) && teacherClassroom.map((room) => (
              <div key={room.class_id}>
                <CradDashBoard
                  onCradClassRoomChange={handleCradClassRoomChange}
                  onShareClassRoomChange={handleShareClassRoomChange}
                  onsetSettingClassRoomChange={handleSettingClassRoomChange}
                  classId={room.class_id}
                  className={room.class_name}
                  color={room.color_name}
                  subject={room.subject_name}
                  status={room.permission_name}
                  subjectType={room.subject_type_name}
                  teacher_name={room.teacher_name}
                  user_name={room.user_name}
                  student_count={room.student_count} // จำนวนที่นับได้
                  code={room.code}
                />
              </div>
            ))
          }

        </div>

      </div>
    </>
  )
}