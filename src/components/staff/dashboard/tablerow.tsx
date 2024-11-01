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
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>)
}