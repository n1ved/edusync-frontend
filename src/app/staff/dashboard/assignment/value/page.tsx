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
import {Input} from "@/components/ui/input";



export default function AddStaff() {

    //use searchParams to get attendance id
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");


    const students = [
        {id: "MDL22CS001", name: "John Doe"},
        {id: "MDL22CS002", name: "Jane Doe"},
        {id: "MDL22CS003", name: "John Smith"},
        {id: "MDL22CS004", name: "Jane Smith"},
        {id: "MDL22CS005", name: "John Doe"},
    ]

    const [assignmentMarks, setAssignmentMarks] = React.useState(
        Array.from({length: students.length}, () => {return {id: "", name: "", marks: 0}})
    );

    function onSubmission(){
        // later check if teacher has permission to add assignment
    }



    function  updateMarks(index: number , id: string, name: string , marks: number){
        let newAssignmentMarks = [...assignmentMarks];
        newAssignmentMarks[index].marks = marks;
        newAssignmentMarks[index].id = id;
        newAssignmentMarks[index].name = name;
        setAssignmentMarks(newAssignmentMarks);
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
                    <h1 className="text-3xl font-semibold">Value Assignments | ID {id}</h1>
                </div>
                <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[1fr] lg:grid-cols-[1fr]">
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <div className="m-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {
                                    students.map((student, index) => {
                                        return (
                                            <Card id={student.id} key={student.id}>
                                                <CardHeader>
                                                    <div className={"grid grid-cols-2 justify-between items-center"}>
                                                        <h2>
                                                            {student.id} | {student.name}
                                                        </h2>
                                                        <Input
                                                            type={"number"}
                                                            placeholder={"Marks"}
                                                            onChange={(e) => updateMarks(index, student.id, student.name, parseInt(e.target.value))}
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
