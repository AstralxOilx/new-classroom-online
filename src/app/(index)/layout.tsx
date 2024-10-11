"use client";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"



export default function indexLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    
    const [isScreenSmall, setIsScreenSmall] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < 850);
        };
        // เรียกครั้งแรกเพื่อตรวจสอบขนาดหน้าจอ
        handleResize();
        // ฟังการเปลี่ยนแปลงขนาดหน้าจอ
        window.addEventListener('resize', handleResize);
        // ลบ event listener เมื่อ component ถูก unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="relative">
            {isScreenSmall ? (//navในส่วน mobile
                <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-5 bg-background h-[60px] w-full border-solid border-b border-primary/15 ">

                    <div className="grid grid-cols-2 gap-2">
                        <Sheet key="left">
                            <SheetTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    size={"icon"}
                                >
                                    <Menu />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                <SheetHeader>
                                    <SheetTitle className="flex justify-center">
                                        <div className="w-[50px] h-[50px] bg-primary/10">
                                        </div>
                                    </SheetTitle>
                                    <SheetDescription className="grid gap-1">
                                        <Link href={"/"} className="rounded-sm flex items-center gap-4 pl-6 pr-6 pt-2 pb-2 bg-primary/10 text-primary hover:border-b-2 border-primary/20">
                                            Sign in
                                        </Link>
                                        <Link href={"/signup"} className="rounded-sm flex items-center gap-4 pl-6 pr-6 pt-2 pb-2 bg-primary/10 text-primary hover:border-b-2 border-primary/20">
                                            Sign up
                                        </Link>
                                    </SheetDescription>

                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                        <div className="flex gap-2 ">
                            <ThemeColorToggle />
                            <ThemeModeToggle />
                        </div>
                    </div>
                </nav >
            ) : ( //navในส่วน desktop
                <nav className="fixed top-0 left-0 right-0 flex items-center justify-between p-5 bg-background h-[60px] w-full border-solid border-b border-primary/15">
                    <div className="w-[50px] h-[50px] bg-primary/10">
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex">
                            <Link href={"/"} className="rounded-l-sm pl-6 pr-6 pt-2 pb-2 bg-primary/20 text-primary">
                                <span className="font-medium hover:border-b-2 border-primary">
                                    Sign in
                                </span>
                            </Link>
                            <Link href={"/signup"} className="rounded-r-sm border-solid border border-primary/10  pl-6 pr-6 pt-2 pb-2">
                                <span className="font-medium hover:border-b-2 border-primary">
                                    Sign up
                                </span>
                            </Link>
                        </div>
                        <div className="flex gap-2 ">
                            <ThemeColorToggle />
                            <ThemeModeToggle />
                        </div>
                    </div>
                </nav >
            )}
            <div className='grid justify-items-center mt-20'>
                {children}
            </div>
        </div >





    )
}