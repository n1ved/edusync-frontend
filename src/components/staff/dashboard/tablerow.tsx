import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import {list} from "postcss";
import Link from "next/link";
import { APIUrls } from "@/app/_api/url";
import { ApiWorker } from "@/app/_api/api_worker";
import { useCallback } from "react";

export default function TableRowDynamic(
    {
        id,
        name,
        DOB,
        phone,
        createdAt
    }: {
        id: string,
        name: string,
        DOB: string,
        phone: string,
        createdAt: string
    }

){
    const handleClick = useCallback(() => {
        handleDelete(id);
    }, [id, handleDelete]);

    function handleDelete(id : any){
        const data = {
            register_no : id
        }
        try{
            ApiWorker.delete_student(document.cookie,data).then((response : any) => {
                if(response.status == 200){
                    alert("Deleted Record of" + id);
                    window.location.href = "/staff/dashboard";
                }
            });
        }catch(e){
            console.log("Unable to delete" + e);
        }
    }
    return( <TableRow>
        <TableCell className="font-medium">
            {id}
        </TableCell>
        <TableCell>
            {name}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {DOB}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {phone}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {createdAt}
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
                    <Link href={"dashboard/editStudent?id=" + id}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <div onClick={handleClick}>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>)
}

