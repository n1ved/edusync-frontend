'use client'
import Image from "next/image"
import Link from "next/link"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react"
import {
    EditIcon,
    MoreHorizontal, Paperclip, PersonStanding,
    PlusCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs"
import TableRowDynamic from "@/components/staff/dashboard/tablerow";
import { useEffect } from "react";
import { ApiWorker } from "@/app/_api/api_worker";

export default function Dashboard() {

    const [advisorMode , setAdvisorMode] = useState(false);
    const [assignmentData, setAssignmentData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await ApiWorker.staff_self_details(document.cookie).then((response) => {
                if(response.data.in_charge_of !== null) {
                    setAdvisorMode(true);
                    response.data.in_charge_of = response.data.in_charge_of.toLowerCase();
                    ApiWorker.staff_view_schedule(document.cookie, response.data.in_charge_of).then((scheduleResponse) => {
                        setScheduleData(convertScheduleData(sortScheduleData(scheduleResponse.data)));
                        console.log(scheduleResponse.data);
                        console.log(sortScheduleData(scheduleResponse.data));
                    });
                    response.data.in_charge_of = response.data.in_charge_of.toUpperCase();
                    ApiWorker.staff_view_students(document.cookie, response.data.in_charge_of).then((studentResponse) => {
                        setStudentData(convertStudentData(studentResponse.data));
                    });
                    response.data.in_charge_of = response.data.in_charge_of.toLowerCase();
                    ApiWorker.staff_get_assignment_by_class(document.cookie,response.data.in_charge_of).then((assignmentRes) => {
                        setAssignmentData(convertAssignmentData(assignmentRes.data));
                        console.log(assignmentRes);
                    });

                }
            }); 
        }
        fetchData();
    }, []);

    function convertAssignmentData(backendData) {
        return backendData.map(item => {
            // Convert ISO date to DD/MM/YYYY format
            const date = new Date(item.due_date);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            
            return {
                id: item.assignment_no.toString(),
                description: item.description,
                class: item.course_no,
                dueDate: formattedDate
            };
        });
    }

    function sortScheduleData(inputData: any[]): any {
        const dayMapping: { [key: string]: number } = {
            'Monday': 0,
            'Tuesday': 1,
            'Wednesday': 2,
            'Thursday': 3,
            'Friday': 4
        };
    
        return inputData.sort((a, b) => dayMapping[a.day] - dayMapping[b.day]);
    }
    
    function convertScheduleData(inputData: any[]):any {
        const dayMapping: { [key: string]: string } = {
            'Monday': 'MON',
            'Tuesday': 'TUE',
            'Wednesday': 'WED',
            'Thursday': 'THU',
            'Friday': 'FRI'
        };

    
        return sortScheduleData(inputData).map(item => ({
            day: dayMapping[item.day],
            hrs: item.hours // rename 'hours' to 'hrs'
        }));
    }

    function convertStudentData(backendData: any[]): any {
        return backendData.map((student, index) => {
            // Convert ISO date to DD/MM/YYYY format
            const dob = new Date(student.date_of_birth);
            const formattedDOB = `${dob.getDate().toString().padStart(2, '0')}/${(dob.getMonth() + 1).toString().padStart(2, '0')}/${dob.getFullYear()}`;
            
            return {
                id: student.register_no, // or student.register_no if you prefer
                name: student.name,
                DOB: formattedDOB,
                phone: student.phone_number,
                createdAt: "01/01/2021" // Add your actual creation date if available
            };
        });
    }
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    return (
        <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <div className="ml-auto flex items-center gap-2">

                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src="/placeholder-user.png"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <Link href={"/login"}>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue={advisorMode ? "students" : "assignment"}>
                        <div className="flex items-center flex-col sm:flex-row">
                            <TabsList>
                                {
                                    advisorMode &&
                                    <TabsTrigger value="students">Students</TabsTrigger>
                                }
                                {
                                    advisorMode &&
                                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                                }
                                <TabsTrigger value="assignment">Assignments</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2 w-[92%] justify-center m-2 sm:w-fit">
                                <a href={"/staff/dashboard/assignment"}>
                                    <Button size="sm" className="h-8 gap-1">
                                        <Paperclip className="h-3.5 w-3.5"/>
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Assignments
                                    </span>
                                    </Button>
                                </a>
                                <a href={"/staff/dashboard/attendance"}>
                                    <Button size="sm" className="h-8 gap-1">
                                        <PersonStanding className="h-3.5 w-3.5"/>
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Attendance
                                    </span>
                                    </Button>
                                </a>
                                <a href={"/staff/dashboard/schedule"}>
                                    <Button size="sm" className="h-8 gap-1">
                                        <EditIcon className="h-3.5 w-3.5"/>
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Schedule
                                    </span>
                                    </Button>
                                </a>
                                <a href={"/staff/dashboard/add"}>
                                    <Button size="sm" className="h-8 gap-1">
                                        <PlusCircle className="h-3.5 w-3.5"/>
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Student
                                    </span>
                                    </Button>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center">
                        </div>
                        <TabsContent value="students">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Students</CardTitle>
                                    <CardDescription>
                                        Manage students in your class
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    DOB
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Phone
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Created at
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                studentData.map((student, index) => (
                                                    <TableRowDynamic
                                                        id={student.id}
                                                        name={student.name}
                                                        DOB={student.DOB}
                                                        phone={student.phone}
                                                        createdAt={student.createdAt}
                                                        key={index}
                                                    />
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                {/*<CardFooter>*/}
                                {/*    <div className="text-xs text-muted-foreground">*/}
                                {/*        Showing <strong>1-10</strong> of <strong>32</strong>{" "}*/}

                                {/*    </div>*/}
                                {/*</CardFooter>*/}
                            </Card>
                        </TabsContent>
                        <TabsContent value="schedule">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Daily Schedule</CardTitle>
                                </CardHeader>
                                <div className="w-full">
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>DAY</TableHead>
                                                    <TableHead>1</TableHead>
                                                    <TableHead>2</TableHead>
                                                    <TableHead>3</TableHead>
                                                    <TableHead>4</TableHead>
                                                    <TableHead>5</TableHead>
                                                    <TableHead>6</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    scheduleData.map((schedule, index) => (
                                                        <TableRow
                                                            key={index}
                                                        >
                                                            <TableCell>
                                                                {schedule.day}
                                                            </TableCell>
                                                            {
                                                                schedule.hrs.map((hour, index) => (
                                                                    <TableCell
                                                                        key={index}
                                                                    >
                                                                        {hour}
                                                                    </TableCell>
                                                                ))
                                                            }
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </div>
                            </Card>
                        </TabsContent>
                        <TabsContent value="assignment">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Assignments</CardTitle>
                                    <CardDescription>
                                        Assignments created by you
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Class</TableHead>
                                                <TableHead>Due Date</TableHead>
                                                <TableHead></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                assignmentData.map((assignment, index) => (
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell>
                                                            {assignment.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {assignment.description}
                                                        </TableCell>
                                                        <TableCell>
                                                            {assignment.class}
                                                        </TableCell>
                                                        <TableCell>
                                                            {assignment.dueDate}
                                                        </TableCell>
                                                        <TableCell>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        aria-haspopup="true"
                                                                        size="icon"
                                                                        variant="ghost"
                                                                    >
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                        <span className="sr-only">Toggle menu</span>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                    <Link href={"/staff/dashboard/assignment/value?id=" + assignment.id}>
                                                                        <DropdownMenuItem>
                                                                                Value
                                                                        </DropdownMenuItem>
                                                                    </Link>
                                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                {/*<CardFooter>*/}
                                {/*    <div className="text-xs text-muted-foreground">*/}
                                {/*        Showing <strong>1-10</strong> of <strong>32</strong>{" "}*/}

                                {/*    </div>*/}
                                {/*</CardFooter>*/}
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
        </TooltipProvider>
    )
}
