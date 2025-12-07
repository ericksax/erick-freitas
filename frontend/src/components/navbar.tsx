import { ChevronDownIcon, SlashIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

export function NavBar() {

  function handleDownload(tipe: string) {

    if(tipe === "xlsx") {
      window.location.href = "http://localhost:3001/api/download/xlsx"
      return
    }

    window.location.href = "http://localhost:3001/api/download/csv"
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={{ pathname: "/users" }}>Users</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="hover:text-gray-100 transition delay-0 ">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex hover:cursor-pointer items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
              Downloads
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-[#1A1D23] ">
              <DropdownMenuItem onClick={()=> handleDownload("csv")} className="hover:cursor-pointer">Extrair dados em CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("xlsx")} className="hover:cursor-pointer"> Extrair dados em XLSX</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
