import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserCardProps {
    user: User;
    onDelete: (user: User) => void;
    onEdit: (user: User) => void;
}

export function UserCard({ user, onDelete, onEdit }: UserCardProps) {
    return (
        <Card className="bg-[#1A1D23] border text-white w-full">
            <CardHeader>
                <CardTitle className="text-gray-300">{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" size="icon" onClick={() => onEdit(user)} className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-300 hover:cursor-pointer">
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onDelete(user)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:cursor-pointer">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
