import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useEffect } from "react";

// Define the shape of a user object
export interface User {
    _id: string;
    name: string;
    email: string;
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.email({ message: "Please enter a valid email." }),
});

type EditUserRequest = z.infer<typeof formSchema>;

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

// The API call function
const updateUser = async ({ _id, ...data }: EditUserRequest & { _id: string }) => {
    await api.put(`/users/${_id}`, data);
};

export function EditUserModal({ user, isOpen, onClose }: EditUserModalProps) {
    const queryClient = useQueryClient();

    const form = useForm<EditUserRequest>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });
    
    // Populate form with user data when the modal opens
    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, form]);

    const { mutate, isPending } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("Usuário atualizado com sucesso!");
            onClose();
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.status === 409) {
                toast.error("Este e-mail já está em uso.");
            } else {
                toast.error("Erro ao atualizar usuário.");
            }
        },
    });

    function onSubmit(values: EditUserRequest) {
        if (user) {
            mutate({ _id: user._id, ...values });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1D23] border-slate-700 text-white">
                {user && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-emerald-400">Editar Usuário</DialogTitle>
                            <DialogDescription>
                                Altere os dados do usuário <span className="text-emerald-400">{user.name}</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nome do usuário" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={onClose}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600" disabled={isPending}>
                                        {isPending ? "Salvando..." : "Salvar Alterações"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
