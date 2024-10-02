import Image from "next/image"
import Link from "next/link"
import { TooltipProvider } from "@radix-ui/react-tooltip";

import {
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
} from "@/components/ui/tabs"
import TableRowDynamic from "@/components/admin/dashboard/tablerow";

export default function Dashboard() {


    const staffData = [
        {
            name: "John Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "Jane Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "John Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "Jane Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "John Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "Jane Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "John Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "Jane Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        },
        {
            name: "John Doe",
            chargeOf: "CS7A",
            courses: ["CST101", "CST202"],
            classes: ["CS5C", "CS3A"],
            createdAt: "2021-10-01",
        }
    ]

    return (
        <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {/*<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">*/}
            {/*    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">*/}
            {/*        <Link*/}
            {/*            href="#"*/}
            {/*            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"*/}
            {/*        >*/}
            {/*            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />*/}
            {/*            <span className="sr-only">EduSync</span>*/}
            {/*        </Link>*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <Home className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Dashboard</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Dashboard</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <ShoppingCart className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Orders</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Orders</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <Package className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Products</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Products</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <Users2 className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Customers</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Customers</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <LineChart className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Analytics</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Analytics</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*    </nav>*/}
            {/*    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">*/}
            {/*        <Tooltip>*/}
            {/*            <TooltipTrigger asChild>*/}
            {/*                <Link*/}
            {/*                    href="#"*/}
            {/*                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"*/}
            {/*                >*/}
            {/*                    <Settings className="h-5 w-5" />*/}
            {/*                    <span className="sr-only">Settings</span>*/}
            {/*                </Link>*/}
            {/*            </TooltipTrigger>*/}
            {/*            <TooltipContent side="right">Settings</TooltipContent>*/}
            {/*        </Tooltip>*/}
            {/*    </nav>*/}
            {/*</aside>*/}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    {/*<Sheet>*/}
                    {/*    <SheetTrigger asChild>*/}
                    {/*        <Button size="icon" variant="outline" className="sm:hidden">*/}
                    {/*            <PanelLeft className="h-5 w-5" />*/}
                    {/*            <span className="sr-only">Toggle Menu</span>*/}
                    {/*        </Button>*/}
                    {/*    </SheetTrigger>*/}
                    {/*    <SheetContent side="left" className="sm:max-w-xs">*/}
                    {/*        <nav className="grid gap-6 text-lg font-medium">*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"*/}
                    {/*            >*/}
                    {/*                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />*/}
                    {/*                <span className="sr-only">Acme Inc</span>*/}
                    {/*            </Link>*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"*/}
                    {/*            >*/}
                    {/*                <Home className="h-5 w-5" />*/}
                    {/*                Dashboard*/}
                    {/*            </Link>*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"*/}
                    {/*            >*/}
                    {/*                <ShoppingCart className="h-5 w-5" />*/}
                    {/*                Orders*/}
                    {/*            </Link>*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="flex items-center gap-4 px-2.5 text-foreground"*/}
                    {/*            >*/}
                    {/*                <Package className="h-5 w-5" />*/}
                    {/*                Products*/}
                    {/*            </Link>*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"*/}
                    {/*            >*/}
                    {/*                <Users2 className="h-5 w-5" />*/}
                    {/*                Customers*/}
                    {/*            </Link>*/}
                    {/*            <Link*/}
                    {/*                href="#"*/}
                    {/*                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"*/}
                    {/*            >*/}
                    {/*                <LineChart className="h-5 w-5" />*/}
                    {/*                Settings*/}
                    {/*            </Link>*/}
                    {/*        </nav>*/}
                    {/*    </SheetContent>*/}
                    {/*</Sheet>*/}

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <div className="ml-auto flex items-center gap-2">
                            <a href={"/admin/dashboard/add"}>

                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5"/>
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Staff
                                    </span>
                                </Button>
                            </a>
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
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            {/*<TabsList>*/}
                            {/*    <TabsTrigger value="all">All</TabsTrigger>*/}
                            {/*    <TabsTrigger value="active">Staff Advisors</TabsTrigger>*/}
                            {/*</TabsList>*/}
                            {/*<div className="ml-auto flex items-center gap-2">*/}
                            {/*    <a href={"/admin/dashboard/add"}>*/}

                            {/*        <Button size="sm" className="h-8 gap-1">*/}
                            {/*            <PlusCircle className="h-3.5 w-3.5" />*/}
                            {/*            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
                            {/*            Add Staff*/}
                            {/*        </span>*/}
                            {/*        </Button>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
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
                                                staffData.map((staff, index) => (
                                                    <TableRowDynamic
                                                        name= {staff.name}
                                                        chargeOf= {staff.chargeOf}
                                                        courses= {staff.courses}
                                                        classes= {staff.classes}
                                                        createdAt= {staff.createdAt}
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
