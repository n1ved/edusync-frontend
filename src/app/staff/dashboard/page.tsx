import Image from "next/image"
import Link from "next/link"
import { TooltipProvider } from "@radix-ui/react-tooltip";

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

export default function Dashboard() {

    const assignmentData = [
        {
            id: "1",
            description: "Assignment 1",
            class: "CST201",
            dueDate: "01/01/2021"
        },
        {
            id: "2",
            description: "Assignment 2",
            class: "CST201",
            dueDate: "01/01/2021"
        },
        {
            id: "3",
            description: "Assignment 3",
            class: "CST201",
            dueDate: "01/01/2021"
        },
        {
            id: "4",
            description: "Assignment 4",
            class: "CST201",
            dueDate: "01/01/2021"
        }
    ]

    const scheduleData = [
        {
            day: "MON",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "TUE",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "WED",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "THU",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "FRI",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "SAT",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        },
        {
            day: "SUN",
            hrs: ["CST201", "CST201", "CST201", "CST201", "CST201", "CST201"]
        }
    ]



    const studentData = [
        {
            id: "1",
            name: "John Doe",
            DOB: "01/01/2001",
            phone: "1234567890",
            createdAt: "01/01/2021"
        },
        {
            id: "2",
            name: "Jane Doe",
            DOB: "01/01/2001",
            phone: "1234567890",
            createdAt: "01/01/2021"
        },
        {
            id: "3",
            name: "John Smith",
            DOB: "01/01/2001",
            phone: "1234567890",
            createdAt: "01/01/2021"
        },
        {
            id: "4",
            name: "Jane Smith",
            DOB: "01/01/2001",
            phone: "1234567890",
            createdAt: "01/01/2021"
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
                    <Tabs defaultValue="students">
                        <div className="flex items-center flex-col sm:flex-row">
                            <TabsList>
                                <TabsTrigger value="students">Students</TabsTrigger>
                                <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                                                                    <DropdownMenuItem>
                                                                        <Link href={"/staff/dashboard/assignment/value?id=" + assignment.id}>
                                                                            Value
                                                                        </Link>
                                                                    </DropdownMenuItem>
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
