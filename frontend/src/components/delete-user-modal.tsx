import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface DeleteUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteUserModal({ user, isOpen, onClose, onConfirm }: DeleteUserModalProps) {
    if (!user) {
        return null;
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="bg-[#1A1D23] border text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-emerald-400">Você tem certeza que vai deletar este usuário?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                        Essa operação não poderá ser derfeita <span className="text-emerald-400">{user.name}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} className="bg-gray-700 text-white hover:bg-gray-600">
                        Cancela
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-red-500 text-white hover:bg-red-600">
                        Deleta
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
