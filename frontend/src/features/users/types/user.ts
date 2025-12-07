import { z } from "zod";

const editFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.email({ message: "Please enter a valid email." }),
});

export interface User {
    _id: string;
    name: string;
    email: string;
}

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

interface UserCardProps {
    user: User;
    onDelete: (user: User) => void;
    onEdit: (user: User) => void;
}


type EditUserRequest = z.infer<typeof editFormSchema>;

export { type EditUserRequest, type EditUserModalProps, type UserCardProps, editFormSchema }