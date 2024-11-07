'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import {
    EditIcon,
    Paperclip, PersonStanding,
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
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import TableRowDynamic from "@/components/admin/dashboard/tablerow";
import { useEffect } from "react";
import { ApiWorker } from "@/app/_api/api_worker";

export default function Dashboard() {

    function convertStaffData(staffItem : any) {
        const allClasses = Array.from(
            new Set(Object.values(staffItem.course_charges).flat())
        );
    
        return {
            id : staffItem.staff_no,
            name: staffItem.name,
            chargeOf: staffItem.in_charge_of,
            courses: Object.keys(staffItem.course_charges),
            classes: allClasses,
            createdAt: '2021-10-01'
        }
    }
    
    


    //Asyncnously call a function
    useEffect(() => {
        const fetchData = async () => {
            const response = await ApiWorker.viewStaff(document.cookie).then((response) => {
                let unprocessedData = response.data;
                for(let i = 0; i < unprocessedData.length; i++) {
                    unprocessedData[i] = convertStaffData(unprocessedData[i]);
                }
                setStaffData(unprocessedData);
                console.log(response.data);
            });

            const response2 = await ApiWorker.viewStaffAdvisor(document.cookie).then((response) => {
                let unprocessedData = response.data;
                for(let i = 0; i < unprocessedData.length; i++) {
                    unprocessedData[i] = convertStaffData(unprocessedData[i]);
                }
                setStaffAdvisorData(unprocessedData);
                console.log(response.data);
            });

        }
        console.log(document.cookie);
        fetchData();
    }, []);

    const [staffData, setStaffData] = useState([
        {
                    id: 1,
                    name: "John Doe",
                    chargeOf: "CS7A",
                    courses: ["CST101", "CST202"],
                    classes: ["CS5C", "CS3A"],
                    createdAt: "2021-10-01",
            },
    ]);
    const [staffAdvisorData, setStaffAdvisorData] = useState([]);

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
                    <Tabs defaultValue="all">
                    <div className="flex items-center flex-col sm:flex-row">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="advisor">Staff Advisors</TabsTrigger>
                            </TabsList>
                        <div className="ml-auto flex items-center gap-2 w-[92%] justify-center m-2 sm:w-fit">
                            <a href={"/admin/dashboard/add"}>
                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5"/>
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Staff
                                    </span>
                                </Button>
                            </a>
                        </div>
                        <div className="flex items-center">

                        </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Staffs</CardTitle>
                                    <CardDescription>
                                        Manage staff information and permissions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>In Charge</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Subjects
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Classes
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
                                                staffData.length > 0 &&
                                                staffData.map((staff, index) => (
                                                    <TableRowDynamic
                                                        id = {staff.id}
                                                        name={staff.name}
                                                        chargeOf={staff.chargeOf}
                                                        courses={staff.courses}
                                                        classes={staff.classes}
                                                        createdAt={""}
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
                        <TabsContent value="advisor">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Staffs</CardTitle>
                                    <CardDescription>
                                        Manage staff information and permissions
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>In Charge</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Subjects
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Classes
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
                                                staffAdvisorData.length > 0 &&
                                                staffAdvisorData.map((staff, index) => (
                                                    <TableRowDynamic
                                                        id = {staff.id}
                                                        name={staff.name}
                                                        chargeOf={staff.chargeOf}
                                                        courses={staff.courses}
                                                        classes={staff.classes}
                                                        createdAt={""}
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
                    </Tabs>
                </main>
            </div>
        </div>
        </TooltipProvider>
    )
}
