"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeModeToggle() {
    const { setTheme, theme } = useTheme();
    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="theme-mode-switch"
                checked={theme === "dark"} // ตั้งค่า checked ตามธีมปัจจุบัน
                onCheckedChange={handleToggle} // เปลี่ยนธีมเมื่อสวิตช์ถูกเปลี่ยน
            />
            {theme === "light" ? (
                <Moon className="w-5 h-5" />
            ) : (
                <Sun className="w-5 h-5" />
            )}
        </div>
    );
}