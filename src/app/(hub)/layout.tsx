"use client";

import React from "react";
import { LogOut, Settings, UserCog, EllipsisVertical, LayoutGrid,School ,Bell} from "lucide-react";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { ThemeColorToggle } from "@/components/theme-color-toggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster } from "@/components/ui/sonner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Suspense } from 'react';
import Loading from "./loading";

export default function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const { data: session, status } = useSession();
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        } else if (status === "authenticated" && session?.user?.username) {
            // ดึงตัวอักษรสองตัวแรก
            const firstTwoLetters = session.user.username.slice(0, 2).toUpperCase();
            setName(firstTwoLetters);
        }
    }, [router, status, session]);

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
        status === "authenticated" && session.user && (

            <div className="relative">

                {isScreenSmall ? (//navในส่วน mobile
                    <nav className=" z-50 fixed top-0 left-0 right-0 flex items-center justify-between p-5 bg-background h-[60px] w-full border-solid border-b border-primary/15 ">
                        <div className="flex justify-between  w-full">
                            <div className="flex gap-2">
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
                                            <SheetDescription className="grid gap-1"></SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="flex gap-2 border-b-2 pb-2">
                                                <span>Name</span>
                                                <span>{session.user.username}</span>
                                            </div>
                                            <Link href={""} className="flex gap-2"><UserCog /> <span>Profile</span></Link>
                                            <Button
                                                className="w-full"
                                                variant={"default"}
                                                size={"sm"}
                                                onClick={() => signOut({ callbackUrl: "/" })}
                                            >
                                                <LogOut size={28} />
                                                <span className="font-bold">Sign Out</span>
                                            </Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className="flex gap-2 ">
                                <Avatar>
                                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                    <AvatarFallback>{name}</AvatarFallback>
                                </Avatar>
                                <ThemeColorToggle />
                                <ThemeModeToggle />
                            </div>
                        </div>
                    </nav >
                ) : ( //navในส่วน desktop
                    <nav className="z-50 fixed top-0 left-0 right-0 flex items-center justify-between p-5 bg-background h-[60px] w-full border-solid border-b border-primary/15">
                        <div className="w-[50px] h-[50px] bg-primary/10">
                        </div>
                        <div className="flex space-x-2">
                            <Avatar>
                                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                <AvatarFallback>{name}</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2 ">
                                <ThemeColorToggle />
                                <ThemeModeToggle />
                            </div>
                            <Popover>
                                <PopoverTrigger><Settings size={28} strokeWidth={1} /></PopoverTrigger>
                                <PopoverContent>
                                    <div className="rounded-md bg-primary/5 p-2 ">
                                        <div className="flex gap-2 p-2 border-b-2">
                                            <p>Name</p>
                                            <p>{session.user.username}</p>
                                        </div>
                                        <div className="pt-2 pb-2 ">
                                            <Link href={""} className="flex gap-2"><UserCog /> <span>Profile</span></Link>
                                        </div>
                                        <Button
                                            className="w-full"
                                            variant={"default"}
                                            size={"sm"}
                                            onClick={() => signOut({ callbackUrl: "/" })}
                                        >
                                            <LogOut size={28} />
                                            <span className="font-bold">Sign Out</span>
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        </div>
                    </nav >
                )}
                <div className="z-40 mt-14 w-full pt-2 bg-primary/5 border-b-2 border-primary/10 fixed top-0 left-0 right-0 flex items-center justify-center">
                    <div className="p-1">
                        <Breadcrumb >
                            <BreadcrumbList className="w-[300px]">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard">
                                        <div className="grid justify-items-center place-content-center hover:scale-105 transition-transform duration-300">
                                            <LayoutGrid className="text-primary" size={25} />
                                            <p className="text-sm">Dashboard</p>
                                        </div>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <div className="border-l-4 border-primary/50 h-8"></div>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/classroom">
                                        <div className="grid justify-items-center place-content-center hover:scale-105 transition-transform duration-300">
                                            <School className="text-primary" size={25}/>
                                            <p className="text-sm">ClassRoom</p>
                                        </div>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <div className="border-l-4 border-primary/50 h-8"></div>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/notification">
                                        <div className="grid justify-items-center place-content-center hover:scale-105 transition-transform duration-300">
                                            <Bell className="text-primary" size={25}/>
                                            <p className="text-sm">Notification</p>
                                        </div>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <Suspense fallback={ <Loading/>}>
                <div className="mt-[7.5rem] pb-4">
                    {children}
                    <Toaster />
                </div>
                </Suspense>
            </div >
        )
    )
}