"use client";
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
import { LoaderCircle } from "lucide-react";


import { useState, useEffect } from "react";
export default function Loading() {
    
    const [isLoading, setIsLoading] = useState(true);
    return <>
        <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Classroom created....</AlertDialogTitle>
                    <AlertDialogDescription className='flex gap-2'>
                        <LoaderCircle size={30} className='animate-spin' />
                        <span>Currently Classroom created. Please wait...</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    </>
}