import { useAuth } from "../contexts/auth";
import { LogOut, Menu, ChevronDownIcon } from "lucide-react"; // Import LogOut and Menu icons
import { NavBar } from "./navbar";
import { useState } from "react"; 
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false); // New state for downloads


  function handleDownload(tipe: string) {

    if(tipe === "xlsx") {
      window.location.href = "http://localhost:8000/api/download/xlsx"
      return
    }

    window.location.href = "http://localhost:8000/api/download/csv"
  }

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-8 m-auto w-full max-w-[1440px] flex items-center justify-center bg-translucent z-10">
      <div className="flex items-center justify-between w-full space-x-4 bg-[rgba(26,29,35,0.92)] border p-4 md:p-8 rounded-2xl h-24 relative">
        <h1 className="text-emerald-600 text-2xl md:text-3xl font-bold">Dash.Weather</h1>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between space-x-4">
          <NavBar />
          <span className="text-xs">Bem vindo, <span>{user?.name}</span></span>
          <button
            onClick={() => logout()}
            className="ml-auto p-2 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer"
            aria-label="Sair"
          >
            <LogOut className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-24 right-0 w-full bg-[rgba(26,29,35,0.92)] border rounded-2xl p-4 flex flex-col items-center space-y-4">
            <Link to={{ pathname: "/users" }} className="w-full p-2 rounded hover:bg-gray-700">Users</Link>
            
            {/* Collapsible Downloads Section */}
            <button 
              onClick={() => setIsDownloadsOpen(!isDownloadsOpen)}
              className="flex items-center gap-1 w-full p-2 rounded hover:bg-gray-700"
            >
              Downloads
              <ChevronDownIcon className={`transition-transform ${isDownloadsOpen ? "rotate-180" : ""}`} />
            </button>
            {isDownloadsOpen && (
              <div className="flex flex-col w-full items-center space-y-2">
                <button onSelect={() => handleDownload("csv")} className="w-full text-center p-2 rounded hover:bg-gray-700">Extrair dados em CSV</button>
                <button onSelect={() => handleDownload("xlsx")} className="w-full text-center p-2 rounded hover:bg-gray-700">Extrair dados em XLSX</button>
              </div>
            )}

            <div className="border-t border-gray-700 w-full pt-4 flex items-center justify-between">
              <span className="text-xs">Bem vindo, <span>{user?.name}</span></span>
              <button
                onClick={() => logout()}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Sair"
              >
                <LogOut className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
