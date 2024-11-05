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
import {Link, MoreHorizontal} from "lucide-react";
import {list} from "postcss";

export default function TableRowDynamic(
    {
        id,
        name,
        chargeOf,
        courses,
        classes,
        createdAt
    }: {
        id:number,
        name: string,
        chargeOf: string,
        courses: string[],
        classes: string[],
        createdAt: string
    }

){

    const url = "/admin/dashboard/add?update="+id;
    return( <TableRow>
        <TableCell className="font-medium">
            {name}
        </TableCell>
        <TableCell>
            <Badge variant="outline">
                {chargeOf}
            </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {
            courses.length >= 0 &&
            courses.map((course) => (
                <Badge key={course} variant="secondary">
                    {course}
                </Badge>
            ))}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {
            classes.length >= 0 &&
            classes.map((classes) => (
                <Badge key={classes } variant="secondary">
                    {classes}
                </Badge>
            ))}
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
                    <a href={url}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </a>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>)
}