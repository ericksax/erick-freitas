import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { UserCard } from "@/components/user-card";
import { DeleteUserModal } from "@/components/delete-user-modal";
import { EditUserModal } from "@/components/edit-user-modal"; // Importar o novo modal
import { api } from "@/lib/axios";
import { ArrowLeftIcon} from "lucide-react";
import { Link } from "react-router-dom";

interface User {
    _id: string;
    name: string;
    email: string;
}

export function Users() {
    const queryClient = useQueryClient();

    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [userToEdit, setUserToEdit] = useState<User | null>(null); // Estado para o modal de edição

    const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await api.get('/users');
            return response.data;
        }
    });

    const { mutate: deleteUser } = useMutation({
        mutationFn: async (userId: string) => {
            await api.delete(`/users/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setUserToDelete(null); // Fechar o modal de deleção
        }
    });

    // Manipulador para abrir o modal de edição
    const handleEdit = (user: User) => {
        setUserToEdit(user);
    };

    const handleDelete = (user: User) => {
        setUserToDelete(user);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete._id);
        }
    };

    if (isLoadingUsers) {
        return (
            <main className="flex-1 p-6 bg-[#030712] text-white h-screen">
                <h1 className="text-2xl font-bold text-gray-300 mb-6">Users</h1>
                <div>Loading...</div>
            </main>
        )
    }

    return (
        <main className="flex-1 p-8 pt-16 flex-col items-center justify-center bg-[#030712] text-white h-screen max-w-[1440px]">
            <Link to={{ pathname: '/dashboard' }} className="flex w-full justify-end mb-6 items-center text-gray-300  hover:text-gray-50 hover:cursor-pointer">        
                    <ArrowLeftIcon className="block float-right h-5"/> Voltar
            </Link>

            <div className="grid grid-cols-1 gap-6">
                {users?.map(user => (
                    <UserCard
                        key={user._id}
                        user={user}
                        onDelete={handleDelete}
                        onEdit={handleEdit} // Passar o manipulador correto
                    />
                ))}
            </div>
            <DeleteUserModal
                user={userToDelete}
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleConfirmDelete}
            />
            <EditUserModal
                user={userToEdit}
                isOpen={!!userToEdit}
                onClose={() => setUserToEdit(null)}
            />
        </main>
    );
}
