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
import { ApiWorker } from "@/app/_api/api_worker";


export default function AddStaff() {

    const [date, setDate] = React.useState<Date>()
    const [day , setDay] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [classId, setClassId] = React.useState("");
    const [hour , setHour] = React.useState("");
    const [classNames, setClassNames] = React.useState([]);
    const [subjectNames, setSubjectNames] = React.useState([]);
    const [students,setStudents] = React.useState([]);
    const [loaded ,setLoaded] = React.useState(false);
    const [attendanceData, setAttendanceData] = React.useState([]);
    // let hour = 1;

    function formatDate(date:any) {
        return new Date(date).toISOString().split('T')[0];
    }
    
    // Usage examples:
    const formattedDate = formatDateAlternative(date);  // Returns "2024-11-05"
    
    // Alternative method using padStart
    function formatDateAlternative(date:any) {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }
    function getDayFromDate(date:any) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayIndex = new Date(date).getDay();
        return days[dayIndex];
    }
    function convertClassData(backendData) {
        return backendData.map(item => item.class);
    }
    function convertStudentData(backendData) {
        return backendData.map(student => ({
            id: student.register_no,
            name: student.name
        }));
    }
    
      


    const [attendance, setAttendance] = React.useState(
        Array.from({length: 1}, () => {return {id: "", name: "", present: false}})
    );

    useEffect(() => {
        ApiWorker.staff_show_classes(document.cookie).then((response) => {
            console.log(response);
            setClassNames(response.data.map((item:any) => item.class));
        });

        ApiWorker.staff_show_courses(document.cookie).then((response) => {
            console.log(response);
            setSubjectNames(response.data.map((item:any) => item.course_no));
        });
        
    },[]);

    function onSubmission(){
        ApiWorker.staff_update_attendance(document.cookie, convertAttendanceFormat(attendanceData, classId)).then((response) => {
            if(response != undefined ){
                console.log(response.data);
                alert("Attendance updated successfully");
            }
        });
    }
    const hrs = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
    ]

    function toggleAttendance(index: number, register_no: string,toggleVal:boolean, studentName: string) {
        let newAttendance = [...attendanceData];
        newAttendance[index] = {
            ...newAttendance[index],
            att: !toggleVal,
            register_no: register_no,
            // Update other fields if needed
            att_id: newAttendance[index].att_id,
            date_of_att: date, // Assuming you have date variable
            day: new Date(date).toLocaleString('en-US', { weekday: 'long' }),
            course_no: newAttendance[index].course_no,
            hour: newAttendance[index].hour
        };
        setAttendanceData(newAttendance);
        console.log(attendanceData);
    }
    
    function convertAttendanceFormat(attendanceArray: any[], className: string) {
        // Get the first record to extract common data
        const firstRecord = attendanceArray[0];
        
        // Format the date
        const date = new Date(firstRecord.date_of_att);
        const formattedDate = date.toISOString().split('T')[0];
    
        return {
            className: className,
            date_of_att: formattedDate,
            day: firstRecord.day,
            hour: firstRecord.hour,
            course_no: firstRecord.course_no,
            attendance: attendanceArray.map(record => ({
                register_no: record.register_no,
                att: record.att
            }))
        };
    }

    function handleSearch(){
        const data = {
            date_of_att: formatDate(date),
            day: getDayFromDate(date),
            course_no: subject,
            className: classId,
            hour : parseInt(hour)
        }
        console.log(data)
        ApiWorker.staff_check_attendance(document.cookie,data).then((response) => {
            if(response != undefined ){
                console.log(response.data);
                setAttendanceData(response.data);
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
                    <h1 className="text-3xl font-semibold">Mark Attendance</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 m-10">
                            {/*    select date*/}
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[300px] sm:w-[200px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Date</span>}
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
                                    <SelectTrigger className="w-[300px] sm:w-[200px]">
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
                                    <SelectTrigger className="w-[300px] sm:w-[200px]">
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
                            {/*    Select Hour*/}
                                <Select onValueChange={(value) => setHour(value)}>
                                    <SelectTrigger className="w-[300px] sm:w-[200px]">
                                        <SelectValue placeholder="Hour"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            hrs.map((subjectName) => (
                                                <SelectItem value={subjectName} key={subjectName}>{subjectName}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>

                            </div>
                        <div className="m-10 flex justify-center items-stretch">
                            <Button onClick={handleSearch}>
                                Search for entries
                            </Button>
                        </div>
                            <div className="m-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {
                                    attendanceData.map((record, index) => {
                                        const studentName = students.find(s => s.register_no === record.register_no)?.name || record.register_no;
                                        return (
                                            <Card id={record.register_no} key={record.att_id}>
                                                <CardHeader>
                                                    <div className={"flex justify-between"}>
                                                        <h2>
                                                            {record.register_no} | {studentName}
                                                        </h2>
                                                        <Switch
                                                            id={"attendance" + index}
                                                            checked={record.att}
                                                            onCheckedChange={() => toggleAttendance(index, record.register_no,record.att, studentName)}
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
