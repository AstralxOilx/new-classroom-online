"use client";
import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useThemeContext } from "@/context/theme-data-provider";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";


const availableThemeColors = [
    { name: "Zinc", light: "bg-zinc-800", dark: "bg-zinc-800" },
    { name: "Blue", light: "bg-blue-800", dark: "bg-blue-800" },
];

export function ThemeColorToggle() {
    const { themeColor, setThemeColor } = useThemeContext();
    const { theme } = useTheme();

    const createSelectItems = () => {
        return availableThemeColors.map(({ name, light, dark }) => (
            <SelectItem key={name} value={name}>
                <div className="flex items-center space-x-3">
                    <div className={cn(
                            "rounded-full",
                            "w-[20px]",
                            "h-[20px]",
                            theme == "light" ? light : dark,
                        )}></div>
                    <div className="text-sm">{name}</div>
                </div>
            </SelectItem>
        ));
    }

    return (
        <Select
        onValueChange={(value) => setThemeColor(value as ThemeColors)}
        defaultValue={themeColor}>
            <SelectTrigger className="w-[150px] ring-offset-transparent focus:ring-transparent">
                <SelectValue placeholder="Select Color"/>
            </SelectTrigger>
            <SelectContent className="border-muted">
                {createSelectItems()}
            </SelectContent>
        </Select>
    )
}
