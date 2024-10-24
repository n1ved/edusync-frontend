import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {TabsList, TabsTrigger , Tabs , TabsContent} from "@/components/ui/tabs";


export default function Login() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[910px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Login to EduSync</h1>
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
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required/>
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
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/login.png"
                    alt="Image"
                    width="1920"
                    height="1080"

                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
)
}
