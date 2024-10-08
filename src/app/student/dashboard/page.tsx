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
import {Badge} from "@/components/ui/badge";

export default function Dashboard() {

    const assignmentData = [
        {
            id: "1",
            description: "Assignment 1",
            course : "CST201",
            from : "John Doe",
            dueDate: "01/01/2021"
        },
        {
            id: "2",
            description: "Assignment 2",
            course : "CST201",
            from : "John Doe",
            dueDate: "01/01/2021"
        },
        {
            id: "3",
            description: "Assignment 3",
            course : "CST201",
            from : "John Doe",
            dueDate: "01/01/2021"
        },
        {
            id: "4",
            description: "Assignment 4",
            course : "CST201",
            from : "John Doe",
            dueDate: "01/01/2021"
        },
        {
            id: "5",
            description: "Assignment 5",
            course : "CST201",
            from : "John Doe",
            dueDate: "01/01/2021"
        },
        {
            id: "6",
            description: "Assignment 6",
            course : "CST201",
            from : "John Doe",
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
    ]


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
                        <div className={"flex flex-col gap-4 justify-center align-top"}>
                            <div className={"grid grid-cols-2 gap-4"}>
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
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Description</TableHead>
                                                <TableHead>Course</TableHead>
                                                <TableHead>From</TableHead>
                                                <TableHead>Due Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {assignmentData.map((data) => (
                                                <TableRow key={data.id}>
                                                    <TableCell className="font-medium">
                                                        {data.description}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.course}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.from}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.dueDate}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}
