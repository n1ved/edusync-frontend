"use client";
import Link from "next/link"
import { useSearchParams } from "next/navigation";
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import React, {use, useEffect} from "react";
import { ApiWorker } from "@/app/_api/api_worker";


export default function AddStaff() {

    const [newClassCreation , setNewClassCreation] = React.useState(false);

    const searchParams = useSearchParams();
    const search = searchParams.get('update');

    const [availableClasses, setAvailableClasses] = React.useState([]);
    const [editMode , setEditMode] = React.useState(false);

    function convertBackendToFrontend(backendData:any) {
        // Get unique classes from all course_charges arrays
        const allClasses = Array.from(
            new Set(
                Object.values(backendData.course_charges)
                    .flat()
            )
        );
        setNumOfClasses(Object.keys(backendData.course_charges).length);
        return {
            name: backendData.name,
            chargeOf: backendData.in_charge_of,
            courses: Object.keys(backendData.course_charges),
            classes: allClasses,
        }
    }

    function extractClassNames(classArray:any) {
        return classArray.map(item => item.class);
    }
    
    useEffect(() => {
        ApiWorker.showClasses(document.cookie).then((response) => {
            if(response.status == 200){
                setAvailableClasses(extractClassNames(response.data));
                console.log(response.data);
            }
        });
    },[]);
    

    if(search !== null){
        const searchData = {
            staff_no : search
        }
        useEffect(() => {
            const fetchData = async () => {
                ApiWorker.editStaff(document.cookie,searchData).then((response) => {
                    if(response.status == 200){
                        setEditMode(true);
                    }
                    console.log(response.data.staffDetails);
                    const data = response.data.staffDetails;
                    const frontendData = convertBackendToFrontend(data);
                    setName(frontendData.name);
                    setClassInCharge(frontendData.chargeOf);
                    const formattedCourseData = {};
                    Object.entries(data.course_charges).forEach(([course, classes], index) => {
                        formattedCourseData[`course${index}`] = {
                            name: course,
                            classes: classes // Use the specific classes for each course
                        };
                    });
                    
                    setCourseData(formattedCourseData);
                    
                });
            }
            fetchData();
        },[]);
    }

    const [name, setName] = React.useState("");
    const [classInCharge, setClassInCharge] = React.useState("");
    const [className, setClassName] = React.useState("");
    const [classes, setClasses] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [courseData, setCourseData] = React.useState({});
    const [numOfClasses, setNumOfClasses] = React.useState(1);

    const handleInputChange = (index:number, field:string, value:any) => {
        setCourseData(prevData => {
            const newData = { ...prevData };

            if (field === 'course') {
                // Get the existing classes for this index or empty array
                // @ts-ignore
                const classes = newData[`course${index}`]?.classes || [];
                // @ts-ignore
                newData[`course${index}`] = {
                    name: value,
                    classes: classes
                };
            } else if (field === 'classes') {
                // Get the existing course name or empty string
                // @ts-ignore
                const courseName = newData[`course${index}`]?.name || '';
                // @ts-ignore
                newData[`course${index}`] = {
                    name: courseName,
                    classes: value.split(',').map(cls => cls.trim())
                };
            }
            return newData;
        });
    };
    const getFinalFormat = () => {
        const finalData = {};
        Object.values(courseData).forEach(course => {
            // @ts-ignore
            if (course.name) {
                // @ts-ignore
                finalData[course.name] = course.classes;
            }
        });
        return finalData;
    };


    function handleClassInChargeChange(event : string){
       if(event == "create-new"){
           setNewClassCreation(true);
       }else{
           setClassInCharge(event);
           console.log(classInCharge);
       }
    }
    function onSubmission(){
        if (password != confirmPassword){
            alert("Passwords don't match");
            setPassword("");
            setConfirmPassword("");
        }
        const data = {
            "name": name,
            "in-charge-of": classInCharge == "nocharge" ? null: classInCharge,
            "course_charges": getFinalFormat(),
            "password": password,
        }
        const updateData = {
            "staff_no": parseInt(search!),
            "name": name,
            "in-charge-of": classInCharge == "nocharge" ? "": classInCharge,
            "course_charges": getFinalFormat(),
        }
        console.log(updateData.staff_no)
        console.log(data)
        if(editMode){
            ApiWorker.editStaff(document.cookie,updateData).then((response) => {
                console.log(response);
                if(response.status == 200){
                    alert("Staff Edited Successfully");
                    window.location.href = "/admin/dashboard";
                }
            });
        }else{
            ApiWorker.addStaff(document.cookie,data).then((response) => {
                console.log(response);
                if(response.status == 200){
                    alert("Staff Added Successfully");
                    window.location.href = "/admin/dashboard";
                }
            });
        }
    }

    function goBack(){
        window.history.back();
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6"/>
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
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6"/>
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
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">{editMode ? "Edit Staff" : "Add New Staff"}</h1>
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
                                    <Input placeholder="Name" onChange={(event) => setName(event.target.value)} value={name}/>
                                </form>
                                <div className={"mt-4"}/>
                                <form>
                                    <Select onValueChange={(value) => handleClassInChargeChange(value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder={editMode ? classInCharge : "Class of Charge"}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"nocharge"}>No Class In Charge</SelectItem>
                                            <SelectItem value={"create-new"}>Create New Class</SelectItem>
                                            {
                                                availableClasses.map((cls) => (
                                                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </form>
                                <div className={"mt-4"}/>
                                {
                                    newClassCreation &&
                                    <form>
                                        <Input placeholder="Class Name"
                                               onChange={(event) => setClassName(event.target.value)}/>
                                    </form>
                                }
                                <div className={"mt-4"}/>
                                <h3 className={"text-lg font-semibold text-muted-foreground"}>
                                    Classes and Courses
                                </h3>
                                <form>
                                    {Array.from({length: numOfClasses}, (_, i) => i).map((index) => (
                                        <div className={"grid gap-5 grid-cols-7 mt-4"} key={index}>
                                            <div className={"col-span-2"}>
                                                <Input
                                                    placeholder={"Course"}
                                                    onChange={(e) => handleInputChange(index, 'course', e.target.value)}
                                                    value={courseData[`course${index}`]?.name || ''}
                                                />
                                            </div>
                                            <div className={"col-span-4"}>
                                                <Input
                                                    placeholder={"Enter classes separated by commas"}
                                                    onChange={(e) => handleInputChange(index, 'classes', e.target.value)}
                                                    value={courseData[`course${index}`]?.classes?.join(', ') || ''}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </form>
                                <div className={"mt-4"}/>
                                <Button
                                    onClick={() => setNumOfClasses(numOfClasses + 1)}
                                    variant={"outline"}
                                >
                                    Add More Class
                                </Button>
                               {
                                !editMode &&
                                <>
                                     <div className={"mt-4"}/>
                                    <h3 className={"text-lg font-semibold text-muted-foreground"}>Credentials</h3>
                                    <div className={"mt-2"}/>
                                    <form>
                                        <Input type="password" placeholder="Create a password"
                                            onChange={(event) => setPassword(event.target.value)}/>
                                    </form>
                                    <div className={"mt-4"}/>
                                    <form>
                                        <Input type="password" placeholder="confirm password"
                                            onChange={(event) => setConfirmPassword(event.target.value)}/>
                                    </form>
                                </>
                               }

                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                {
                                    editMode &&
                                    <Button onClick={onSubmission}>Update</Button>
                                }
                                {
                                    !editMode &&
                                    <Button onClick={onSubmission}>Add Staff</Button>
                                }
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
