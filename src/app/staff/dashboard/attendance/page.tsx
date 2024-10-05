"use client";
import Link from "next/link"
import {CalendarIcon, CircleUser, Menu, Package2, Search} from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, {useEffect} from "react";
import {Switch} from "@/components/ui/switch";
import {useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";


export default function AddStaff() {

    const [date, setDate] = React.useState<Date>()
    const [subject, setSubject] = React.useState("");
    const [classId, setClassId] = React.useState("");


    const students = [
        {id: "MDL22CS001", name: "John Doe"},
        {id: "MDL22CS002", name: "Jane Doe"},
        {id: "MDL22CS003", name: "John Smith"},
        {id: "MDL22CS004", name: "Jane Smith"},
        {id: "MDL22CS005", name: "John Doe"},
    ]

    const [attendance, setAttendance] = React.useState(
        Array.from({length: students.length}, () => {return {id: "", name: "", present: false}})
    );

    function onSubmission(){
        // later check if teacher has permission to add assignment
    }

    const classNames = [
        "CS26C",
        "CS26B",
        "CS26A",
    ]

    const subjectNames = [
        "CST201",
        "CST202",
        "CST203",
    ]

    function  toggleAttendance(index: number , id: string, name: string){
        let newAttendance = [...attendance];
        newAttendance[index].present = !newAttendance[index].present;
        newAttendance[index].id = id;
        newAttendance[index].name = name;
        setAttendance(newAttendance);
        console.log(date);
    }



    function goBack(){
        window.history.back();
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="/admin/dashboard"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>

                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>

                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Mark Attendance</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <div className="grid grid-cols-3 gap-6 m-10">
                            {/*    select date*/}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Date of Birth</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                {/*    select subject*/}
                                <Select onValueChange={(value) => setClassId(value)}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Class"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            classNames.map((className) => (
                                                <SelectItem value={className} key={className}>{className}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                {/*    select class*/}
                                <Select onValueChange={(value) => setSubject(value)}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Subject"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            subjectNames.map((subjectName) => (
                                                <SelectItem value={subjectName} key={subjectName}>{subjectName}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="m-10 grid grid-cols-2 gap-10">
                                {
                                    students.map((student, index) => {
                                        return (
                                            <Card id={index + student.id}>
                                                <CardHeader>
                                                    <div className={"flex justify-between"}>
                                                        <h2>
                                                            {student.id} | {student.name}
                                                        </h2>
                                                        <Switch
                                                            id={"attendance" + index}
                                                            checked={attendance[index].present}
                                                            onCheckedChange={() => toggleAttendance(index, student.id, student.name)}
                                                        />
                                                    </div>
                                                </CardHeader>
                                            </Card>
                                        )
                                    })
                                }

                            </div>

                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={onSubmission}>Save</Button>
                                <div className={"mr-2"}/>
                                <Button variant={"outline"} onClick={goBack}>Cancel</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
