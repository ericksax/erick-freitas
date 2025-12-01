import { useAuth } from "../contexts/auth";
import { LogOut } from "lucide-react"; // Import LogOut icon

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="px-8 pt-8 fixed top-0 left-0 w-full flex items-center justify-between bg-[#030712]">
      <div className="flex items-center justify-between space-x-4  bg-[#1A1D23] p-8 rounded-2xl  w-full h-24">
        <h1 className="text-emerald-600 text-3xl font-bold">Dash.Weather</h1>
        <div className="flex items-center justify-between space-x-4 ">
          <span className="text-xs">Bem vindo, <span>{user?.name}</span></span>
          <button 
            onClick={() => logout()} 
            className="ml-auto p-2 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer" 
            aria-label="Sair" 
          > 
            <LogOut  className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}

