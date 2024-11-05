"use client";
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

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
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, {useEffect} from "react";
import {collectMetadata} from "next/dist/lib/metadata/resolve-metadata";
import { ApiWorker } from "@/app/_api/api_worker";


export default function AddSchedule() {

    const [newClassCreation , setNewClassCreation] = React.useState(false);

    const [name, setName] = React.useState("");
    const [classInCharge, setClassInCharge] = React.useState("");
    const [className, setClassName] = React.useState("");
    const [classes, setClasses] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [scheduleData  , setScheduleData] = React.useState(
        Array.from({length: 5}, () => Array.from({length: 6}, () => ""))
    );
    const [subjects, setSubjects] = React.useState([]);
    const [editMode, setEditMode] = React.useState(true);

    useEffect(() => {
        ApiWorker.staff_show_courses(document.cookie).then((response) => {
            console.log(response);
            setSubjects(response.data.map((item:any) => item.course_no));
        });
        ApiWorker.staff_self_details(document.cookie).then((response) => {
            if(response.data.in_charge_of !== null) {
                response.data.in_charge_of = response.data.in_charge_of.toLowerCase();
                setClassInCharge(response.data.in_charge_of);
                ApiWorker.staff_view_schedule(document.cookie, response.data.in_charge_of).then((scheduleResponse) => {
                    console.log(scheduleResponse.data);
                    if(scheduleResponse.data.length === 0) {
                        if(editMode){
                            setEditMode(false);
                        }
                    }else{
                       console.log(scheduleResponse.data);
                       console.log(convertToHoursArray(scheduleResponse.data));
                       setScheduleData(convertToHoursArray(scheduleResponse.data));
                    }
                });
            }
        });
    },[]);

    

    const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ];
    function convertToHoursArray(schedule) {
        return schedule.map(day => day.hours);
    }
    function createScheduleFormat(hoursArray, days) {
        return days.map((day, index) => ({
            day: day,
            hours: hoursArray[index]
        }));
    }
    function convertArrayToScheduleFormat(hoursArray, className) {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        const schedule = {};
        
        days.forEach((day, index) => {
            schedule[day] = hoursArray[index];
        });
    
        return {
            className: className,
            schedule: schedule
        };
    }
    
    

    function onSelectData(data : string , col:string , hr:number){
       let copy = [...scheduleData];
         let index = weekdays.indexOf(col);
            copy[index][hr-1] = data;
    }



    function onSubmission(){
        console.log(createScheduleFormat(scheduleData,weekdays));
        const data = convertArrayToScheduleFormat(scheduleData,classInCharge);
        ApiWorker.staff_add_schedule(document.cookie, data).then((response) => {
            console.log(response);
            if(response.status === 200){
                alert("Schedule Updated");
                window.location.href = "/staff/dashboard/schedule";
            }
        });
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
                    <h1 className="text-3xl font-semibold">Edit Schedule</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Enter Details</CardTitle>
                                <CardDescription>
                                    Columns marked with * are required
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="flex flex-col gap-2 justify-center">
                                    {
                                        weekdays.map((day) => {
                                            return (
                                                <div className="grid grid-cols-7 items-center gap-2" key={day}>
                                                    <h2>
                                                        {day}
                                                    </h2>
                                                    {
                                                        subjects.map((subject,index) => {
                                                            return (
                                                                <div className=" grid grid-cols-6" key={index+day}>
                                                                    <Select onValueChange={(data) => onSelectData(data,day,(index+1))}>
                                                                        <SelectTrigger className="w-[100px]">
                                                                            <SelectValue placeholder={editMode ? scheduleData[weekdays.indexOf(day)][index] : ("hr " + (index +1))} defaultValue={editMode ? scheduleData[weekdays.indexOf(day)][index] : undefined}/>
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {
                                                                                subjects.map((subject) => (
                                                                                    <SelectItem value={subject}
                                                                                                key={subject}>{subject}</SelectItem>
                                                                                ))
                                                                            }
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </form>


                            </CardContent>
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
