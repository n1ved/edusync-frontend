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
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, {useEffect} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Calendar} from "@/components/ui/calendar";
import { cn } from "@/lib/utils";


export default function AddStaff() {

    const [date, setDate] = React.useState<Date>()
    const [id,setID] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


    function onSubmission(){
        if (password != confirmPassword){
            alert("Passwords don't match");
            setPassword("");
            setConfirmPassword("");
        }
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
                    <h1 className="text-3xl font-semibold">Add New Staff</h1>
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
                                <form>
                                    <Input placeholder="Student ID" onChange={(event) => setID(event.target.value)}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
                                    <Input placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
                                    <Input placeholder="Phone Number" onChange={(event) => setPhone(event.target.value)}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
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
                                </form>
                                <div className={"mt-4"}/>
                                <h3 className={"text-lg font-semibold text-muted-foreground"}>Credentials</h3>
                                <div className={"mt-2"}/>
                                <form>
                                    <Input placeholder="Create a username"
                                           onChange={(event) => setUsername(event.target.value)}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
                                    <Input type="password" placeholder="Create a password"
                                           onChange={(event) => setPassword(event.target.value)}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
                                    <Input type="password" placeholder="confirm password"
                                           onChange={(event) => setConfirmPassword(event.target.value)}/>
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