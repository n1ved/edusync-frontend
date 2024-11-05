'use client'
import Image from "next/image"
import Link from "next/link"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {useEffect, useState} from "react";

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
import {Badge} from "@/components/ui/badge";
import { ApiWorker } from "@/app/_api/api_worker";

export default function Dashboard() {
    

    const [regNo, setRegNo] = useState("");
    const [assignmentData, setAssignmentData] = useState([]);
    const [completedAssignmentData, setCompletedAssignmentData] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    useEffect(() => {
        ApiWorker.view_student_details(document.cookie).then((response) => {
            if(response.status === 200) {
                setRegNo(response.data.register_no);
                fetchAssignmentData();
            }
        });
        const fetchAssignmentData = async () => {
            ApiWorker.view_remaining_assignment(document.cookie).then((response) => {
                console.log("fetching")
                if(response.status === 200) {
                    console.log(response.data);
                    //Date to DD/MM/YYYY
                    response.data.map((data) => {
                        const date = new Date(data.due_date);
                        data.due_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    });


                    setAssignmentData(response.data);
                }
            });
        
            ApiWorker.view_completed_assignment(document.cookie).then((response) => {
                console.log("fetching")
                if(response.status === 200) {
                    console.log(response.data);
                    setCompletedAssignmentData(response.data);
                }
            });

            ApiWorker.view_schedule(document.cookie).then((response) => {
                console.log("fetching")
                if(response.status === 200) {
                    const convertedData = convertScheduleData(response.data);
                    console.log(convertedData);
                    setScheduleData(convertedData);
                }
            });
        }
    },[]);
    interface ScheduleItem {
        day: string;
        hrs: string[];
    }
    
    function convertScheduleData(backendData: any): ScheduleItem[] {
        const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
        
        return days.map(day => ({
            day,
            hrs: backendData[day]?.[0] || Array(6).fill('')
        }));
    }
    


    const attendanceData = [
        {
            id: "CST201",
            present: 10,
            total: 10,
            attendance: "100%",
        },
        {
            id: "CST202",
            present: 9,
            total: 10,
            attendance: "90%",
        },
        {
            id: "CST203",
            present: 8,
            total: 10,
            attendance: "80%",
        },
        {
            id: "CST204",
            present: 7,
            total: 10,
            attendance: "70%",
        },
        {
            id: "CST205",
            present: 6,
            total: 10,
            attendance: "60%",
        },
        {
            id: "CST206",
            present: 5,
            total: 10,
            attendance: "50%",
        }
        ]


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
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className={"flex flex-col gap-4 justify-center align-top max-w-[92%] box-border"}>
                            <div className={"grid grid-cols-1 sm:grid-cols-2 gap-4 box-border"}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Attendance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Course</TableHead>
                                                    <TableHead>Present</TableHead>
                                                    <TableHead>Total</TableHead>
                                                    <TableHead>Attendance</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {attendanceData.map((data) => (
                                                    <TableRow key={data.id}>
                                                        <TableCell className="font-medium">
                                                            {data.id}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.present}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.total}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.attendance}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Schedule</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Day</TableHead>
                                                    <TableHead>Hours</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {scheduleData.map((data) => (
                                                    <TableRow key={data.day}>
                                                        <TableCell className="font-medium">
                                                            {data.day}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.hrs.map((hrs) => (
                                                                <Badge key={hrs} variant="secondary">
                                                                    {hrs}
                                                                </Badge>
                                                            ))}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Assignments</CardTitle>
                                </CardHeader>
                                <CardContent>
                                   <Tabs defaultValue={"upcoming"}>
                                       <TabsList>
                                           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                           <TabsTrigger value="completed">Completed</TabsTrigger>
                                       </TabsList>
                                       <TabsContent value={"upcoming"}>
                                           <Table>
                                               <TableHeader>
                                                   <TableRow>
                                                       <TableHead>Description</TableHead>
                                                       <TableHead>Course</TableHead>
                                                       <TableHead>Due Date</TableHead>
                                                       <TableHead>Total Marks</TableHead>
                                                   </TableRow>
                                               </TableHeader>
                                               <TableBody>
                                                   {assignmentData.map((data) => (
                                                       <TableRow key={data.id}>
                                                           <TableCell className="font-medium">
                                                               {data.description}
                                                           </TableCell>
                                                           <TableCell>
                                                               {data.course_no}
                                                           </TableCell>
                                                           <TableCell>
                                                               {data.due_date}
                                                           </TableCell>
                                                           <TableCell>
                                                               {data.total_marks}
                                                           </TableCell>
                                                       </TableRow>
                                                   ))}
                                               </TableBody>
                                           </Table>
                                       </TabsContent>
                                       <TabsContent value={"completed"}>
                                           <Table>
                                               <TableHeader>
                                                   <TableRow>
                                                       <TableHead>Description</TableHead>
                                                       <TableHead>Course</TableHead>
                                                       <TableHead>Awarded Marks</TableHead>
                                                       <TableHead>Total Marks</TableHead>
                                                   </TableRow>
                                               </TableHeader>
                                               <TableBody>
                                                   {completedAssignmentData.map((data) => 
                                                    data.award_marks == null ? null : (
                                                        (
                                                            <TableRow key={data.id}>
                                                                <TableCell className="font-medium">
                                                                    {data.description}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {data.course_no}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {data.award_marks}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {data.marks}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )
                                                )}
                                               </TableBody>
                                           </Table>
                                       </TabsContent>
                                   </Tabs>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}

