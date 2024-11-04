'use client'
import {useState} from "react";
import {Quicksand} from "next/font/google";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {TabsList, TabsTrigger , Tabs , TabsContent} from "@/components/ui/tabs";
import { ApiWorker } from "../_api/api_worker";
const quickSand = Quicksand({ subsets: ["latin"] });

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleAdminLogin() {
        ApiWorker.admin_login(username, password).then((response) => {
            document.cookie = `${response.data.token}`;
            if(response.status === 200) {
                window.location.href = "/admin/dashboard";
            }
        });
    }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[910px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold"></h1>
                    </div>
                    <Tabs defaultValue={"student"}>
                        <div className={"w-full flex justify-center"}>
                            <TabsList>
                                <TabsTrigger value="student">Student</TabsTrigger>
                                <TabsTrigger value="staff">Staff</TabsTrigger>
                                <TabsTrigger value="admin">Admin</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="Enter your ID"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                            <TabsContent value="student">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </TabsContent>
                            <TabsContent value="staff">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </TabsContent>
                            <TabsContent value="admin">
                                <Button type="submit" className="w-full" onClick={handleAdminLogin}>
                                    Login
                                </Button>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
            <div className="h-full lg:block flex flex-row bg-primary justify-center">
                <div className={"h-[100vh] w-[50vw] bg-primary text-secondary text-8xl m-0 p-5 font-extrabold flex flex-col justify-center max-sm:hidden"}>
                    <div className={quickSand.className}>
                        <h2 className={"font-outline-2 text-primary"}>Welcome</h2>
                        <h3 className={"font-outline-2 text-primary"}>to</h3>
                        <h2 className={"text-9xl"}>Edusync</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
